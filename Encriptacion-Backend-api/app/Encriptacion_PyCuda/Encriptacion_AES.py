from pycuda.compiler import SourceModule
import pycuda.driver as cuda
from pycuda import gpuarray
import numpy as np
import math

def encriptar(texto):
    cuda.init()
    device = cuda.Device(0)
    context = device.make_context()
    try:
        texto_np = np.frombuffer(texto.encode('utf-8'), dtype=np.uint8)
        texto_gpu = gpuarray.to_gpu(texto_np)

        encriptacion_aes ="""
            __global__ void encriptacion_aes(unsigned char *data, int data_size) {
                int idx = threadIdx.x + blockIdx.x * blockDim.x;
                if (idx < data_size) {
                    unsigned char base_key = 0xBB;
                    unsigned char xor_key = base_key ^ (idx % 256);
                    data[idx] = data[idx] ^ xor_key;
                    data[idx] = (data[idx] >> 2) | (data[idx] << (8 - 2));
                    unsigned char mask = 0x3F; 
                    mask ^= (idx & 0xFF); 
                    data[idx] ^= mask;
                }
            }
        """
        mod = SourceModule(encriptacion_aes)
        aes_kernel = mod.get_function("encriptacion_aes")

        hilos_bloque = 256
        bloques = math.ceil(len(texto_np)/hilos_bloque)

        aes_kernel(texto_gpu, np.int32(texto_np.size), block=(hilos_bloque, 1, 1), grid=(bloques, 1))

        context.synchronize()

        texto_encriptado = texto_gpu.get().tobytes()
        return texto_encriptado
    finally:
        context.pop()
        context.detach()

def desencriptar(texto_ecncriptado):
    cuda.init()
    device = cuda.Device(0)
    context = device.make_context()
    try:
        texto_gpu = gpuarray.to_gpu(np.frombuffer(texto_ecncriptado, dtype=np.uint8))

        desencriptacion_aes ="""
            __global__ void desencriptacion_aes(unsigned char *data, int data_size) {
                int idx = threadIdx.x + blockIdx.x * blockDim.x;
                if (idx < data_size) {
                    unsigned char mask = 0x3F; 
                    mask ^= (idx & 0xFF);
                    data[idx] ^= mask; 
                    data[idx] = (data[idx] << 2) | (data[idx] >> (8 - 2));

                    unsigned char base_key = 0xBB;
                    unsigned char xor_key = base_key ^ (idx % 256);
                    data[idx] = data[idx] ^ xor_key;
                }
            }
        """

        mod = SourceModule(desencriptacion_aes)
        aes_kernel = mod.get_function("desencriptacion_aes")
        hilos_bloque = 256
        bloques = math.ceil(texto_gpu.size / hilos_bloque)

        aes_kernel(texto_gpu, np.int32(texto_gpu.size), block=(hilos_bloque, 1, 1), grid=(bloques, 1))

        resultado_texto = texto_gpu.get().tobytes().decode('utf-8', errors='ignore')
        return resultado_texto
    finally:
        context.pop()
        context.detach()

#texto_original = "Este es un texto de prueba."
#texto_cifrado = encriptar(texto_original)
#print("Texto cifrado:", texto_cifrado)

#texto_descifrado = desencriptar(texto_cifrado)
#print("Texto descifrado:", texto_descifrado)