#!/usr/bin/env python3
"""
Generate editable Microsoft Word (.docx) documents for ABSS Nexus Technologies:
1. ABSS_Nexus_Internship_Offer_Letter.docx (A4 Portrait)
2. ABSS_Nexus_Internship_Certificate.docx (A4 Landscape Certificate with MSME logo, QR Code & Seal)
"""

import os
from PIL import Image
import qrcode
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.enum.section import WD_ORIENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

PROJECT_ROOT = "/Users/shubhamkumar/New-ABSS-Deploy"
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "public", "assets", "documents")
DIST_OUTPUT_DIR = os.path.join(PROJECT_ROOT, "dist", "public", "assets", "documents")
IMAGES_DIR = os.path.join(PROJECT_ROOT, "public", "assets", "images")

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(DIST_OUTPUT_DIR, exist_ok=True)

# Helper XML utilities
def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=140, bottom=140, left=180, right=180):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def remove_table_borders(table):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'<w:top w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        f'<w:bottom w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        f'<w:left w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        f'<w:right w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        f'<w:insideH w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        f'<w:insideV w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def set_table_box_border(table, color="D2D2D7", sz="8"):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:left w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:right w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:insideH w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:insideV w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def set_page_border(section, hex_color="0A2540", sz="24"):
    sectPr = section._sectPr
    pgBorders = parse_xml(
        f'<w:pgBorders {nsdecls("w")} w:offsetFrom="page">'
        f'<w:top w:val="triple" w:sz="{sz}" w:space="24" w:color="{hex_color}"/>'
        f'<w:bottom w:val="triple" w:sz="{sz}" w:space="24" w:color="{hex_color}"/>'
        f'<w:left w:val="triple" w:sz="{sz}" w:space="24" w:color="{hex_color}"/>'
        f'<w:right w:val="triple" w:sz="{sz}" w:space="24" w:color="{hex_color}"/>'
        f'</w:pgBorders>'
    )
    sectPr.append(pgBorders)

# =============================================================================
# 1. BUILD INTERNSHIP OFFER LETTER (.DOCX)
# =============================================================================
def build_offer_letter():
    doc = Document()
    
    # Page Setup: A4 Portrait
    section = doc.sections[0]
    section.orientation = WD_ORIENT.PORTRAIT
    section.page_width = Inches(8.27)
    section.page_height = Inches(11.69)
    section.top_margin = Inches(0.65)
    section.bottom_margin = Inches(0.65)
    section.left_margin = Inches(0.75)
    section.right_margin = Inches(0.75)

    # Header Table: 2 Columns (Logo on left, Company Info on right)
    header_table = doc.add_table(rows=1, cols=2)
    header_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    remove_table_borders(header_table)
    
    cell_left = header_table.cell(0, 0)
    cell_right = header_table.cell(0, 1)
    cell_left.width = Inches(3.6)
    cell_right.width = Inches(3.1)
    
    # Left: Logo & Company Name
    p_logo = cell_left.paragraphs[0]
    p_logo.paragraph_format.space_after = Pt(2)
    logo_path = os.path.join(IMAGES_DIR, "Logo.png")
    if os.path.exists(logo_path):
        run_logo = p_logo.add_run()
        run_logo.add_picture(logo_path, width=Inches(2.4))
    else:
        run_title = p_logo.add_run("ABSS NEXUS TECHNOLOGIES\n")
        run_title.bold = True
        run_title.font.size = Pt(14)
        run_title.font.color.rgb = RGBColor(0x00, 0x66, 0xCC)
    
    p_tagline = cell_left.add_paragraph()
    p_tagline.paragraph_format.space_before = Pt(0)
    p_tagline.paragraph_format.space_after = Pt(0)
    run_tag = p_tagline.add_run("INNOVATE  •  SOLVE  •  ELEVATE")
    run_tag.font.size = Pt(7.5)
    run_tag.bold = True
    run_tag.font.color.rgb = RGBColor(0x6E, 0x6E, 0x73)

    # Right: Contact & Corporate Info
    p_info = cell_right.paragraphs[0]
    p_info.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_info.paragraph_format.space_after = Pt(0)
    p_info.paragraph_format.line_spacing = 1.15
    
    info_lines = [
        ("ABSS Nexus Technologies", True, 9.5, RGBColor(0x1D, 0x1D, 0x1F)),
        ("Registered Corporate Office: India", False, 8, RGBColor(0x6E, 0x6E, 0x73)),
        ("Web: www.abssnexus.in", False, 8, RGBColor(0x00, 0x66, 0xCC)),
        ("Email: contact@abssnexus.in", False, 8, RGBColor(0x00, 0x66, 0xCC)),
        ("Student Support: +91 87579 28673", False, 8, RGBColor(0x6E, 0x6E, 0x73)),
        ("CIN / MSME Reg: UDYAM-JH-20-0038921", False, 7.5, RGBColor(0x8E, 0x8E, 0x93)),
    ]
    for text, bold, sz, color in info_lines:
        r = p_info.add_run(text + "\n")
        r.bold = bold
        r.font.size = Pt(sz)
        r.font.color.rgb = color

    # Decorative Blue Accent Line
    p_divider = doc.add_paragraph()
    p_divider.paragraph_format.space_before = Pt(6)
    p_divider.paragraph_format.space_after = Pt(12)
    pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="18" w:space="1" w:color="0066CC"/></w:pBdr>')
    p_divider._p.get_or_add_pPr().append(pBdr)

    # Reference & Date Bar Table
    ref_table = doc.add_table(rows=1, cols=2)
    ref_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    remove_table_borders(ref_table)
    cell_ref = ref_table.cell(0, 0)
    cell_date = ref_table.cell(0, 1)
    cell_ref.width = Inches(3.4)
    cell_date.width = Inches(3.3)
    
    p_ref = cell_ref.paragraphs[0]
    p_ref.paragraph_format.space_after = Pt(0)
    r_ref = p_ref.add_run("Ref No: ABSS/INT/2026/0482")
    r_ref.bold = True
    r_ref.font.size = Pt(9.5)
    r_ref.font.color.rgb = RGBColor(0x1D, 0x1D, 0x1F)

    p_dt = cell_date.paragraphs[0]
    p_dt.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_dt.paragraph_format.space_after = Pt(0)
    r_dt = p_dt.add_run("Date of Issue: October 20, 2026")
    r_dt.bold = True
    r_dt.font.size = Pt(9.5)
    r_dt.font.color.rgb = RGBColor(0x1D, 0x1D, 0x1F)

    # Title: INTERNSHIP OFFER LETTER
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(14)
    p_title.paragraph_format.space_after = Pt(12)
    r_title = p_title.add_run("INTERNSHIP OFFER LETTER")
    r_title.bold = True
    r_title.font.size = Pt(16)
    r_title.font.color.rgb = RGBColor(0x00, 0x44, 0x88)

    # Salutation & Opening Paragraph
    p_salut = doc.add_paragraph()
    p_salut.paragraph_format.space_before = Pt(0)
    p_salut.paragraph_format.space_after = Pt(6)
    r_s = p_salut.add_run("Dear [Candidate Name],")
    r_s.bold = True
    r_s.font.size = Pt(10.5)

    p_body1 = doc.add_paragraph()
    p_body1.paragraph_format.space_before = Pt(0)
    p_body1.paragraph_format.space_after = Pt(10)
    p_body1.paragraph_format.line_spacing = 1.2
    r_b1 = p_body1.add_run(
        "On behalf of ABSS Nexus Technologies, we are pleased to offer you an appointment as a "
    )
    r_b1.font.size = Pt(10)
    r_b1_bold = p_body1.add_run("Virtual Full Stack Web Development Intern")
    r_b1_bold.bold = True
    r_b1_bold.font.size = Pt(10)
    r_b1_end = p_body1.add_run(
        ". This offer is extended in recognition of your academic merit, technical aptitude, and enthusiasm for building modern web software architectures."
    )
    r_b1_end.font.size = Pt(10)

    # Terms & Internship Specifications Box (Table)
    spec_table = doc.add_table(rows=7, cols=2)
    spec_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_box_border(spec_table, color="D2D2D7", sz="4")
    
    specs = [
        ("Designation / Role", "Virtual Software Engineering & Web Development Intern"),
        ("Program Track", "Full Stack Web Development (HTML5, Modern CSS, JavaScript, APIs)"),
        ("Program Duration", "8 Weeks (Structured Project Milestones)"),
        ("Commencement Date", "November 01, 2026 to December 26, 2026"),
        ("Work Mode", "100% Remote / Virtual with Weekly Git Code Reviews"),
        ("Reporting Mentor", "Shubham Kumar — Founder & Technical Lead"),
        ("Credential Awarded", "Industry-Verifiable Certificate of Completion & Letter of Recommendation"),
    ]
    
    for i, (label, val) in enumerate(specs):
        row = spec_table.rows[i]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.3)
        c1.width = Inches(4.4)
        
        # Alternating background
        bg_col = "F5F5F7" if i % 2 == 0 else "FFFFFF"
        set_cell_background(c0, bg_col)
        set_cell_background(c1, bg_col)
        set_cell_margins(c0, top=70, bottom=70, left=110, right=110)
        set_cell_margins(c1, top=70, bottom=70, left=110, right=110)
        
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(label)
        r0.bold = True
        r0.font.size = Pt(9)
        r0.font.color.rgb = RGBColor(0x1D, 0x1D, 0x1F)
        
        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(val)
        r1.font.size = Pt(9)
        r1.font.color.rgb = RGBColor(0x33, 0x33, 0x36)

    # Terms and Conditions
    p_tc = doc.add_paragraph()
    p_tc.paragraph_format.space_before = Pt(12)
    p_tc.paragraph_format.space_after = Pt(4)
    r_tc = p_tc.add_run("Key Program Highlights & Code of Conduct:")
    r_tc.bold = True
    r_tc.font.size = Pt(9.5)
    r_tc.font.color.rgb = RGBColor(0x00, 0x44, 0x88)

    points = [
        ("Hands-on Engineering: ", "You will build production-grade modules including responsive layouts, API integrations, and database schemas with clean commits on GitHub."),
        ("Weekly Milestone Reviews: ", "Your code deliverables will be reviewed against real-world engineering rubrics: accessibility, semantic correctness, code modularity, and speed."),
        ("Verifiable Credential: ", "Upon achieving passing rubric scores on all project milestones, you will receive a QR-verifiable certificate recognized under MSME registration."),
        ("Letter of Recommendation (LoR): ", "Candidates demonstrating Grade A distinction receive a personalized LoR signed by the Founder to support job interviews."),
        ("Academic Honesty: ", "Plagiarism or submitting AI-generated code without comprehension violates company standards and leads to revocation of credentials."),
    ]
    for b_title, b_desc in points:
        p_pt = doc.add_paragraph(style='List Bullet')
        p_pt.paragraph_format.space_before = Pt(0)
        p_pt.paragraph_format.space_after = Pt(2)
        p_pt.paragraph_format.line_spacing = 1.15
        rt = p_pt.add_run(b_title)
        rt.bold = True
        rt.font.size = Pt(8.5)
        rt.font.color.rgb = RGBColor(0x1D, 0x1D, 0x1F)
        rd = p_pt.add_run(b_desc)
        rd.font.size = Pt(8.5)
        rd.font.color.rgb = RGBColor(0x55, 0x55, 0x58)

    # Closing paragraph
    p_close = doc.add_paragraph()
    p_close.paragraph_format.space_before = Pt(8)
    p_close.paragraph_format.space_after = Pt(14)
    p_close.paragraph_format.line_spacing = 1.15
    rc = p_close.add_run(
        "We are excited to welcome you into our engineering cohort and look forward to partnering in your professional development as a software developer."
    )
    rc.font.size = Pt(9)

    # Signatures Table: 3 Columns (HR on left, Seal in center, Founder on right)
    sig_table = doc.add_table(rows=1, cols=3)
    sig_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    remove_table_borders(sig_table)
    
    col_hr, col_seal, col_founder = sig_table.cell(0, 0), sig_table.cell(0, 1), sig_table.cell(0, 2)
    col_hr.width = Inches(2.2)
    col_seal.width = Inches(2.2)
    col_founder.width = Inches(2.3)
    
    # Left: HR Dept
    p_hr = col_hr.paragraphs[0]
    p_hr.paragraph_format.space_after = Pt(0)
    p_hr.paragraph_format.line_spacing = 1.15
    r_hr1 = p_hr.add_run("Sincerely,\nFor ABSS Nexus Technologies\n\n\n")
    r_hr1.font.size = Pt(8.5)
    r_hr2 = p_hr.add_run("Human Resources & Talent Desk\nABSS Nexus Technologies")
    r_hr2.bold = True
    r_hr2.font.size = Pt(8.5)
    r_hr2.font.color.rgb = RGBColor(0x1D, 0x1D, 0x1F)

    # Center: Seal
    p_seal = col_seal.paragraphs[0]
    p_seal.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_seal.paragraph_format.space_after = Pt(0)
    seal_path = os.path.join(IMAGES_DIR, "abss-seal.png")
    if os.path.exists(seal_path):
        p_seal.add_run().add_picture(seal_path, width=Inches(1.2))

    # Right: Founder Signature
    p_fnd = col_founder.paragraphs[0]
    p_fnd.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_fnd.paragraph_format.space_after = Pt(0)
    p_fnd.paragraph_format.line_spacing = 1.15
    sig_path = os.path.join(IMAGES_DIR, "shubham-signature.png")
    if os.path.exists(sig_path):
        p_fnd.add_run().add_picture(sig_path, width=Inches(1.5))
        p_fnd.add_run("\n")
    else:
        p_fnd.add_run("\n\n\n")
    
    rf_name = p_fnd.add_run("Shubham Kumar\n")
    rf_name.bold = True
    rf_name.font.size = Pt(9)
    rf_name.font.color.rgb = RGBColor(0x00, 0x44, 0x88)
    rf_title = p_fnd.add_run("Founder & Technical Lead\nABSS Nexus Technologies")
    rf_title.font.size = Pt(8.5)
    rf_title.font.color.rgb = RGBColor(0x6E, 0x6E, 0x73)

    # Candidate Acceptance Box
    p_box = doc.add_paragraph()
    p_box.paragraph_format.space_before = Pt(14)
    p_box.paragraph_format.space_after = Pt(0)
    
    acc_table = doc.add_table(rows=1, cols=1)
    acc_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_box_border(acc_table, color="D2D2D7", sz="4")
    c_acc = acc_table.cell(0, 0)
    c_acc.width = Inches(6.7)
    set_cell_background(c_acc, "FAFBFD")
    set_cell_margins(c_acc, top=80, bottom=80, left=120, right=120)
    
    pa = c_acc.paragraphs[0]
    pa.paragraph_format.space_after = Pt(2)
    ra_head = pa.add_run("CANDIDATE ACCEPTANCE & ACKNOWLEDGEMENT (Please sign & return copy):")
    ra_head.bold = True
    ra_head.font.size = Pt(8)
    ra_head.font.color.rgb = RGBColor(0x00, 0x44, 0x88)
    
    pa2 = c_acc.add_paragraph()
    pa2.paragraph_format.space_before = Pt(2)
    pa2.paragraph_format.space_after = Pt(0)
    ra_body = pa2.add_run(
        "I accept the offer of Virtual Internship on the terms described above. I agree to abide by all intellectual property, confidentiality, and engineering guidelines of ABSS Nexus Technologies.\n\n"
        "Candidate Full Name: _______________________   Signature: _______________________   Date: _______________"
    )
    ra_body.font.size = Pt(8)
    ra_body.font.color.rgb = RGBColor(0x55, 0x55, 0x58)

    # Save
    out_path = os.path.join(OUTPUT_DIR, "ABSS_Nexus_Internship_Offer_Letter.docx")
    doc.save(out_path)
    # Also copy to dist
    dist_path = os.path.join(DIST_OUTPUT_DIR, "ABSS_Nexus_Internship_Offer_Letter.docx")
    doc.save(dist_path)
    print(f"Offer Letter DOCX saved: {out_path}")
    return out_path


# =============================================================================
# 2. BUILD INTERNSHIP CERTIFICATE (.DOCX)
# =============================================================================
def build_certificate():
    doc = Document()
    
    # Page Setup: A4 Landscape
    section = doc.sections[0]
    section.orientation = WD_ORIENT.LANDSCAPE
    section.page_width = Inches(11.69)
    section.page_height = Inches(8.27)
    section.top_margin = Inches(0.4)
    section.bottom_margin = Inches(0.4)
    section.left_margin = Inches(0.5)
    section.right_margin = Inches(0.5)
    
    # Apply triple royal navy security page border
    set_page_border(section, hex_color="0A2540", sz="24")

    # Header Table: 3 Columns
    # Left: MSME Emblem | Center: ABSS Nexus Logo | Right: ISO/Reg Badge
    hdr_table = doc.add_table(rows=1, cols=3)
    hdr_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    remove_table_borders(hdr_table)
    
    c_msme = hdr_table.cell(0, 0)
    c_logo = hdr_table.cell(0, 1)
    c_iso = hdr_table.cell(0, 2)
    c_msme.width = Inches(3.2)
    c_logo.width = Inches(4.3)
    c_iso.width = Inches(3.2)
    
    # 1. MSME Logo
    p_msme = c_msme.paragraphs[0]
    p_msme.paragraph_format.space_after = Pt(0)
    msme_path = os.path.join(IMAGES_DIR, "msme-logo.png")
    if os.path.exists(msme_path):
        p_msme.add_run().add_picture(msme_path, width=Inches(1.8))
    else:
        rm = p_msme.add_run("MSME\nGovt. of India Registered")
        rm.bold = True
        rm.font.size = Pt(10)
        rm.font.color.rgb = RGBColor(0x0A, 0x25, 0x40)

    # 2. ABSS Logo
    p_logo = c_logo.paragraphs[0]
    p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_logo.paragraph_format.space_after = Pt(0)
    logo_path = os.path.join(IMAGES_DIR, "Logo.png")
    if os.path.exists(logo_path):
        p_logo.add_run().add_picture(logo_path, width=Inches(2.8))
    else:
        rl = p_logo.add_run("ABSS NEXUS TECHNOLOGIES\n")
        rl.bold = True
        rl.font.size = Pt(16)
        rl.font.color.rgb = RGBColor(0x00, 0x66, 0xCC)
    
    # Tagline
    p_tag = c_logo.add_paragraph()
    p_tag.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_tag.paragraph_format.space_before = Pt(2)
    p_tag.paragraph_format.space_after = Pt(0)
    rt = p_tag.add_run("INNOVATE  •  SOLVE  •  ELEVATE")
    rt.bold = True
    rt.font.size = Pt(8.5)
    rt.font.color.rgb = RGBColor(0x00, 0x66, 0xCC)

    # 3. ISO / Accreditation Badge on right
    p_iso = c_iso.paragraphs[0]
    p_iso.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_iso.paragraph_format.space_after = Pt(0)
    p_iso.paragraph_format.line_spacing = 1.15
    ri1 = p_iso.add_run("ACADEMIC & INDUSTRY RECOGNITION\n")
    ri1.bold = True
    ri1.font.size = Pt(8)
    ri1.font.color.rgb = RGBColor(0x0A, 0x25, 0x40)
    ri2 = p_iso.add_run("UDYAM-JH-20-0038921\nISO 9001:2015 Compliant Standards\nNational Internship Verification Hub")
    ri2.font.size = Pt(7.5)
    ri2.font.color.rgb = RGBColor(0x6E, 0x6E, 0x73)

    # Certificate Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(10)
    p_title.paragraph_format.space_after = Pt(2)
    rtitle = p_title.add_run("CERTIFICATE OF COMPLETION")
    rtitle.bold = True
    rtitle.font.size = Pt(24)
    rtitle.font.color.rgb = RGBColor(0x0A, 0x25, 0x40)

    # Subtitle
    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(8)
    rsub = p_sub.add_run("INTERNSHIP EXCELLENCE & MERIT")
    rsub.bold = True
    rsub.font.size = Pt(11)
    rsub.font.color.rgb = RGBColor(0xB4, 0x53, 0x09)

    # Presentation text
    p_pres = doc.add_paragraph()
    p_pres.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_pres.paragraph_format.space_before = Pt(0)
    p_pres.paragraph_format.space_after = Pt(4)
    rpres = p_pres.add_run("This is proudly presented to")
    rpres.italic = True
    rpres.font.size = Pt(12)
    rpres.font.color.rgb = RGBColor(0x6E, 0x6E, 0x73)

    # Student Name
    p_name = doc.add_paragraph()
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_name.paragraph_format.space_before = Pt(2)
    p_name.paragraph_format.space_after = Pt(6)
    rname = p_name.add_run("[STUDENT FULL NAME]")
    rname.bold = True
    rname.font.size = Pt(22)
    rname.font.color.rgb = RGBColor(0x0A, 0x25, 0x40)

    # Achievement Description
    p_desc = doc.add_paragraph()
    p_desc.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_desc.paragraph_format.space_before = Pt(0)
    p_desc.paragraph_format.space_after = Pt(14)
    p_desc.paragraph_format.line_spacing = 1.25
    
    r_d1 = p_desc.add_run("for successfully completing the 8-Week Virtual Internship in ")
    r_d1.font.size = Pt(11)
    r_d1.font.color.rgb = RGBColor(0x2D, 0x37, 0x48)
    
    r_track = p_desc.add_run("Full Stack Web Development")
    r_track.bold = True
    r_track.font.size = Pt(11.5)
    r_track.font.color.rgb = RGBColor(0x00, 0x66, 0xCC)
    
    r_d2 = p_desc.add_run(
        " at ABSS Nexus Technologies, demonstrating outstanding mastery of modern web architecture, responsive user interfaces, backend API services, clean code quality, and collaborative Git version control workflows with "
    )
    r_d2.font.size = Pt(11)
    r_d2.font.color.rgb = RGBColor(0x2D, 0x37, 0x48)
    
    r_grade = p_desc.add_run("Distinction (Grade A+)")
    r_grade.bold = True
    r_grade.font.size = Pt(11.5)
    r_grade.font.color.rgb = RGBColor(0x1B, 0x87, 0x3F)
    
    r_d3 = p_desc.add_run(".")
    r_d3.font.size = Pt(11)

    # Bottom Table: 3 Columns
    # Left: QR Code & Verification Info | Center: Gold Seal | Right: Signatures
    bot_table = doc.add_table(rows=1, cols=3)
    bot_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    remove_table_borders(bot_table)
    
    c_qr, c_seal, c_sig = bot_table.cell(0, 0), bot_table.cell(0, 1), bot_table.cell(0, 2)
    c_qr.width = Inches(3.4)
    c_seal.width = Inches(3.9)
    c_sig.width = Inches(3.4)
    
    # Left: QR Code & Verification URL
    p_qr = c_qr.paragraphs[0]
    p_qr.paragraph_format.space_after = Pt(0)
    qr_path = os.path.join(IMAGES_DIR, "verification-qr.png")
    if os.path.exists(qr_path):
        p_qr.add_run().add_picture(qr_path, width=Inches(1.2))
    
    p_qr_txt = c_qr.add_paragraph()
    p_qr_txt.paragraph_format.space_before = Pt(2)
    p_qr_txt.paragraph_format.space_after = Pt(0)
    p_qr_txt.paragraph_format.line_spacing = 1.15
    rq1 = p_qr_txt.add_run("Scan to Verify Credential\n")
    rq1.bold = True
    rq1.font.size = Pt(8.5)
    rq1.font.color.rgb = RGBColor(0x0A, 0x25, 0x40)
    rq2 = p_qr_txt.add_run("abssnexus.in/verify-certificate\n")
    rq2.font.size = Pt(8)
    rq2.font.color.rgb = RGBColor(0x00, 0x66, 0xCC)
    rq3 = p_qr_txt.add_run("Certificate ID: ABSS-CERT-2026-WD-9402\nIssue Date: October 2026")
    rq3.font.size = Pt(7.5)
    rq3.font.color.rgb = RGBColor(0x6E, 0x6E, 0x73)

    # Center: Gold Seal
    p_seal = c_seal.paragraphs[0]
    p_seal.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_seal.paragraph_format.space_after = Pt(0)
    gold_seal_path = os.path.join(IMAGES_DIR, "gold-seal.png")
    if os.path.exists(gold_seal_path):
        p_seal.add_run().add_picture(gold_seal_path, width=Inches(1.5))

    # Right: Dual Signatures
    p_sig = c_sig.paragraphs[0]
    p_sig.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_sig.paragraph_format.space_after = Pt(0)
    sig_path = os.path.join(IMAGES_DIR, "shubham-signature.png")
    if os.path.exists(sig_path):
        p_sig.add_run().add_picture(sig_path, width=Inches(1.6))
        p_sig.add_run("\n")
    else:
        p_sig.add_run("\n\n")
    
    rs1 = p_sig.add_run("Shubham Kumar\n")
    rs1.bold = True
    rs1.font.size = Pt(9.5)
    rs1.font.color.rgb = RGBColor(0x0A, 0x25, 0x40)
    rs2 = p_sig.add_run("Founder & Technical Lead\nABSS Nexus Technologies\n\n")
    rs2.font.size = Pt(8)
    rs2.font.color.rgb = RGBColor(0x6E, 0x6E, 0x73)
    rs3 = p_sig.add_run("Head of Academic Mentorship\nAuthorized Signatory")
    rs3.font.size = Pt(8)
    rs3.font.color.rgb = RGBColor(0x6E, 0x6E, 0x73)

    # Save
    out_path = os.path.join(OUTPUT_DIR, "ABSS_Nexus_Internship_Certificate.docx")
    doc.save(out_path)
    # Also copy to dist
    dist_path = os.path.join(DIST_OUTPUT_DIR, "ABSS_Nexus_Internship_Certificate.docx")
    doc.save(dist_path)
    print(f"Certificate DOCX saved: {out_path}")
    return out_path

if __name__ == "__main__":
    build_offer_letter()
    build_certificate()
    print("All Word documents generated successfully.")
