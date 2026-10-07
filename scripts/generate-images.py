"""Regenerate local social cards and icons from the central site manifest.
Run npm run seo:public first. Requires Pillow (see requirements-seo.txt).
No external image, font or network request is made.
"""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, PngImagePlugin

root = Path(__file__).resolve().parents[1]
data = json.loads((root / 'build/.generated/image-manifest.json').read_text(encoding='utf-8'))
paper, ink, sage, saffron = '#faf9f5', '#24352c', '#e7ebde', '#b9512c'
font_paths = [Path('C:/Windows/Fonts/segoeui.ttf'), Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')]
font_path = next((p for p in font_paths if p.exists()), None)
if not font_path:
    raise RuntimeError('Install DejaVu Sans or provide Segoe UI for local image generation')
def font(size): return ImageFont.truetype(str(font_path), size)
def save(image, name, **kwargs):
    dest = root / 'public' / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, **kwargs)
for route, page in data['pages'].items():
    image = Image.new('RGB', (1200, 630), paper)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((870, -120, 1380, 740), radius=230, fill=sage)
    draw.line((74, 176, 1126, 176), fill='#dedfd5', width=2)
    draw.text((74, 66), data['site']['name'], font=font(47), fill=ink)
    draw.text((74, 217), page['label'].upper(), font=font(23), fill=saffron)
    words = page['heading'].split(); lines=[]; line=''
    for word in words:
        trial=(line+' '+word).strip()
        if draw.textlength(trial,font=font(56))>1000 and line: lines.append(line); line=word
        else: line=trial
    if line: lines.append(line)
    for i,line in enumerate(lines): draw.text((74, 282+i*76), line, font=font(56), fill=ink)
    draw.text((74, 535), 'India-focused multimodal AI  /  bharatgoai.com', font=font(24), fill=ink)
    info=PngImagePlugin.PngInfo();info.add_text('Title',page['title'])
    save(image,page['image'].lstrip('/'),optimize=True,pnginfo=info)
    save(image,page['image'].lstrip('/').replace('.png','.webp'),format='WEBP',quality=88)
for size,name in [(16,'favicon-16x16.png'),(32,'favicon-32x32.png'),(180,'apple-touch-icon.png'),(192,'android-chrome-192x192.png'),(512,'android-chrome-512x512.png'),(512,'maskable-512x512.png')]:
    image=Image.new('RGB',(size,size),ink);draw=ImageDraw.Draw(image)
    label='B';face=font(round(size*.58));box=draw.textbbox((0,0),label,font=face)
    draw.text(((size-(box[2]-box[0]))/2-box[0],(size-(box[3]-box[1]))/2-box[1]),label,font=face,fill=paper)
    save(image,name,optimize=True)
    if name=='android-chrome-512x512.png': save(image,'favicon.ico',format='ICO',sizes=[(16,16),(32,32),(48,48)])
image=Image.new('RGB',(600,160),paper);draw=ImageDraw.Draw(image)
draw.text((24,32),data['site']['name'],font=font(76),fill=ink);save(image,'brand/wordmark.png',optimize=True)
(root/'public/safari-pinned-tab.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M16 8h18c19 0 20 23 8 25 15 4 13 23-6 23H16zm10 9v12h8c9 0 9-12 0-12zm0 21v10h9c10 0 10-10 0-10z"/></svg>\n',encoding='utf-8')
print('Generated seven 1200x630 social images, WebP variants, wordmark and favicon set.')

