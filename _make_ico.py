from PIL import Image
import os

candidates = [
    'd:/Sonda/Precix/admin/dist/logo-sonda.png',
    'd:/Sonda/Precix/admin/public/logo-sonda.png',
    'd:/Sonda/Precix/frontend/dist/logo-sonda.png',
    'd:/Sonda/Precix/frontend/public/logo-sonda.png',
    'd:/Sonda/Precix/agente_local/logo-sonda.png',
]
src = None
for p in candidates:
    if os.path.exists(p):
        src = p
        break
if src is None:
    raise SystemExit('Source PNG not found in candidates: ' + str(candidates))

dst = 'd:/Sonda/Precix/agente_local/dist/logo-sonda.ico'
print('Using source:', src)
im = Image.open(src).convert('RGBA')
sizes = [(16,16),(32,32),(48,48),(256,256)]
frames = []
for (w,h) in sizes:
    # create square canvas size max(w,h)
    size = max(w,h)
    canvas = Image.new('RGBA', (size, size), (0,0,0,0))
    # resize image preserving aspect ratio
    ratio = min(size / im.width, size / im.height)
    new_w = int(im.width * ratio)
    new_h = int(im.height * ratio)
    resized = im.resize((new_w, new_h), Image.LANCZOS)
    # paste centered
    x = (size - new_w) // 2
    y = (size - new_h) // 2
    canvas.paste(resized, (x,y), resized)
    frames.append(canvas)

# Pillow: save ICO with multiple sizes by passing the largest image and sizes param
largest = frames[-1]
ico_sizes = [(f.size[0], f.size[1]) for f in frames]
largest.save(dst, format='ICO', sizes=ico_sizes)
print('Wrote', dst)
