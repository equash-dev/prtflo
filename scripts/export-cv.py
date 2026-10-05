"""Single-page CV with a restrained two-column editorial layout."""
import json
from pathlib import Path
import shutil
import sys
from urllib.parse import urlsplit
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


data = json.load(sys.stdin)
root = Path(__file__).resolve().parent.parent
output = root / 'output' / 'pdf' / data['labels']['filename']
output.parent.mkdir(parents=True, exist_ok=True)
font = root / 'node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf'
pdfmetrics.registerFont(TTFont('Geist', str(font)))
pdfmetrics.registerFontFamily('Geist', normal='Geist', bold='Helvetica-Bold')
ink = colors.HexColor('#141411')
paper = colors.white
width, height = A4
pdf = canvas.Canvas(str(output), pagesize=A4)
pdf.setTitle(data['name'] + ' - ' + data['currentRole'])
pdf.setAuthor(data['name'])
pdf.setSubject(data['title'])
pdf.setFillColor(paper)
pdf.rect(0, 0, width, height, stroke=0, fill=1)

left, right, edge = 38, 210, width - 38
body_width = edge - right
printed = data['print']
website = data.get('website')
if website:
    website_parts = urlsplit(website)
    if website_parts.scheme not in ('https', 'http') or not website_parts.netloc:
        raise ValueError('CV website must be an absolute HTTP(S) URL.')


def paragraph(value, x, top, block_width, size=10.2, leading=13.5, markup=False, font='Geist'):
    style = ParagraphStyle('block', fontName=font, fontSize=size,
                           leading=leading, textColor=ink)
    block = Paragraph(value if markup else escape(value), style)
    _, block_height = block.wrap(block_width, height)
    if top + block_height > height - 36:
        raise ValueError(f'Content exceeds page: {value[:60]}')
    block.drawOn(pdf, x, height - top - block_height)
    return top + block_height


def label(value, top):
    paragraph(value.upper(), left, top, right - left - 22,
              size=10, leading=13.5, font='Helvetica-Bold')


# Broad name and a separate contact block, as in the supplied reference.
name = data['name'].upper()
name_width = 365
name_size = min(36, name_width / pdfmetrics.stringWidth(name, 'Helvetica-Bold', 1))
paragraph(name, left - 1, 32, name_width, size=name_size,
          leading=40, font='Helvetica-Bold')
paragraph(data['currentRole'], left, 87, name_width, size=15, leading=19)
paragraph(data['employer'], left, 111, name_width, size=10.5, leading=14)
contact_x = 422
contact_width = edge - contact_x
paragraph(data['location'], contact_x, 35, contact_width, size=8.7, leading=12)
contact = '<link href="tel:' + data['phone'].replace(' ', '') + '">' + escape(data['phone']) + '</link><br/>'
contact += '<link href="mailto:' + escape(data['email']) + '">' + escape(data['email']) + '</link>'
if website:
    website_label = website_parts.netloc + website_parts.path.rstrip('/')
    contact += '<br/><link href="' + escape(website) + '"><u>' + escape(website_label) + '</u></link>'
paragraph(contact, contact_x, 67, contact_width, size=8.5, leading=12, markup=True)

label('Education', 166)
y = 166
for item in data['education']:
    y = paragraph(item['course'] + '<br/>' + item['institution'],
                  right, y, body_width, markup=True)

# All section details align to one right-hand column.
y += 28
label('Experience', y)
for job in data['employment']:
    title = job['employer'] if job['employer'] == 'Freelance' else job['role'] + ', ' + job['employer']
    heading = '<b>' + escape(title) + '</b>'
    y = paragraph(heading, right, y, body_width, size=10.2, leading=13.5, markup=True)
    y = paragraph(job['period'], right, y + 1, body_width, size=9.5, leading=13)
    y = paragraph(printed['experience'][job['employer']], right, y + 4,
                  body_width, size=10.2, leading=13.5)
    y += 15

y += 3
label('Skills', y)
column_gap = 22
skill_width = (body_width - column_gap) / 2
skills = [printed['skills'][:3], printed['skills'][3:]]
ends = []
for index, group in enumerate(skills):
    ends.append(paragraph('<br/>'.join(escape(item) for item in group),
                          right + index * (skill_width + column_gap), y,
                          skill_width, size=9.6, leading=12.8, markup=True))
y = max(ends) + 24
label('Selected project', y)
project_heading = '<b>' + escape(data['project']['name']) + ' / ' + escape(data['project']['period']) + '</b>'
if website:
    project_heading = '<link href="' + escape(website) + '"><u>' + project_heading + '</u></link>'
y = paragraph(project_heading,
              right, y, body_width, markup=True)
y = paragraph(printed['project'], right, y + 4, body_width, size=10.2, leading=13.5)

pdf.showPage()
pdf.save()
public_file = root / 'public' / 'about' / data['labels']['filename']
public_file.parent.mkdir(parents=True, exist_ok=True)
shutil.copy2(output, public_file)
print(f'Created {public_file.relative_to(root)} (1 page; content ends at {y:.1f}pt)')
