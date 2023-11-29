from pycuda.compiler import SourceModule
import pycuda.driver as cuda
from pycuda import gpuarray
import numpy as np
import math

def conversion_ascii(texto):
    return np.array([ord(char) for char in texto], dtype=np.int32)

def conversion_texto(lista_ascii):
    return ''.join(chr(num) for num in lista_ascii)

def encriptar(texto, e = 17, n = 3233):
    cuda.init()
    device = cuda.Device(0)
    context = device.make_context()
    try:
        texto_np = conversion_ascii(texto)
        texto_gpu = gpuarray.to_gpu(texto_np)

        encriptacion_rsa ="""
            __device__ int exp_mod(int base, int exp, int mod) {
                int res = 1;
                base = base % mod;
                while (exp > 0) {
                    if (exp & 1) 
                        res = (res * base) % mod;
                    exp >>= 1; 
                    base = (base * base) % mod;
                }
                return res;
            }

            __global__ void encriptacion_rsa(int *valores, int clave, int modulo, int tam) {
                int i = blockIdx.x * blockDim.x + threadIdx.x;
                if (i < tam) {
                    valores[i] = exp_mod(valores[i], clave, modulo);
                }
            }
        """

        mod = SourceModule(encriptacion_rsa)
        rsa_kernel = mod.get_function("encriptacion_rsa")

        hilos_bloque = 256
        bloques = math.ceil(len(texto_np)/hilos_bloque)

        rsa_kernel(texto_gpu, np.int32(e),np.int32(n), np.int32(len(texto_np)), block=(hilos_bloque, 1, 1), grid=(bloques, 1))

        context.synchronize()

        resultado = texto_gpu.get()
        return resultado.tolist()
    finally:
        context.pop()
        context.detach()

def desencriptar(texto_ecncriptado, d = 2753, n = 3233 ):
    cuda.init()
    device = cuda.Device(0)
    context = device.make_context()
    try:
        texto_encriptado_np = np.array(texto_ecncriptado, dtype=np.int32)
        texto_encriptado_gpu = gpuarray.to_gpu(texto_encriptado_np)

        desencriptacion_rsa = """
            __device__ int exp_mod(int value, int power, int mod) {
                int result = 1;
                value = value % mod;
                while (power > 0) {
                    if (power & 1)
                        result = (long long)result * value % mod;
                    power >>= 1;
                    value = (long long)value * value % mod;
                }
                return result;
            }

            __global__ void descencriptacion_rsa(int *values, int exponent, int modulus, int length) {
                int index = blockIdx.x * blockDim.x + threadIdx.x;
                if (index < length) {
                    values[index] = exp_mod(values[index], exponent, modulus);
                }
            }
        """
        mod = SourceModule(desencriptacion_rsa)
        rsa_kernel = mod.get_function("descencriptacion_rsa")

        hilos_bloque = 256
        bloques = math.ceil(len(texto_ecncriptado) / hilos_bloque)

        rsa_kernel(texto_encriptado_gpu, np.int32(d), np.int32(n), np.int32(len(texto_ecncriptado)),
                   block=(hilos_bloque, 1, 1), grid=(bloques, 1))

        context.synchronize()

        resultado = texto_encriptado_gpu.get()

        texto_desencriptado = conversion_texto(resultado)
        return texto_desencriptado
    finally:
        context.pop()
        context.detach()

#texto_original = "¡Hola Mundo!"
#texto_encriptar = encriptacion(texto_original)
#print("Texto encriptado:", texto_encriptado)
#texto_desencriptado = desencriptacion(texto_encriptado)
#print("Texto desencriptado:", texto_desencriptado)
#if texto_desencriptar == texto_original:
#    print("¡La encriptación y desencriptación funcionaron correctamente!")
#else:
#    print("Algo salió mal en el proceso.")