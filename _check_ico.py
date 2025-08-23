from PIL import Image
p='d:/Sonda/Precix/agente_local/dist/logo-sonda.ico'
try:
    im=Image.open(p)
    print('format',im.format,'size',im.size,'mode',im.mode)
    try:
        i=0
        while True:
            im.seek(i)
            print('frame',i,'size',im.size,'mode',im.mode)
            i+=1
    except EOFError:
        pass
except Exception as e:
    print('ERROR',e)
