import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const mailPrimero = process.env.MAILPRIMERO || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name,
      email,
      phone,
      hasStore,
      catalogSize,
      interests,
      budget,
      preferredTime } = body;

    //const fromEmail = 'onboarding@resend.dev';// Keeping resend default for now or using configured one
    const fromEmail = 'business@business.protolylat.com'

    if (!mailPrimero) {
      return NextResponse.json({ error: "ADMIN_EMAIL not configured" }, { status: 500 });
    }

    //const recipients = [mailPrimero];
    //if (mailSegundo) recipients.push(mailSegundo);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [mailPrimero],
      // cc: [mailSegundo, mailTercero], //lo que va
      subject: `Nuevo Lead: Ecommerce — ${name}`,
      html: buildEmailHtml({ name, email, phone, hasStore, catalogSize, interests, budget, preferredTime }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

 
type EmailData = {
  name?: string;
  email?: string;
  phone?: string;
  hasStore?: string;
  catalogSize?: string;
  interests?: string[];
  budget?: string;
  preferredTime?: string;
};
 
function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <span style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#64748b;display:block;margin-bottom:4px;">${label}</span>
        <span style="font-size:15px;color:#f1f5f9;font-weight:600;">${value || '—'}</span>
      </td>
    </tr>`;
}
 
function buildEmailHtml({ name, email, phone, hasStore, catalogSize, interests, budget, preferredTime }: EmailData) {
  const accent = "#00e5cc";
  const bg = "#080d1a";
  const card = "#0d1525";
 
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nuevo Lead — Auditoría IA</title>
</head>
<body style="margin:0;padding:0;background:${bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${bg};padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
 
        <!-- HEADER -->
        <tr>
          <td style="text-align:center;padding-bottom:36px;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:${accent};font-weight:700;">Nuevo Lead</p>
            <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Auditoría de IA Gratuita</h1>
            <p style="margin:8px 0 0;font-size:13px;color:#64748b;">${new Date().toLocaleDateString('es-AR', { dateStyle: 'long' })}</p>
          </td>
        </tr>
 
        <!-- CONTACT CARD -->
        <tr>
          <td style="background:${card};border:1px solid rgba(0,229,204,0.15);border-radius:20px;padding:28px 32px;margin-bottom:16px;">
            <p style="margin:0 0 20px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${accent};font-weight:700;">Contacto</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td width="50%" style="padding-bottom:16px;vertical-align:top;">
                  <span style="font-size:11px;color:#64748b;display:block;margin-bottom:4px;text-transform:uppercase;">Nombre</span>
                  <span style="font-size:20px;font-weight:800;color:#ffffff;">${name || '—'}</span>
                </td>
                <td width="50%" style="padding-bottom:16px;vertical-align:top;">
                  <span style="font-size:11px;color:#64748b;display:block;margin-bottom:4px;text-transform:uppercase;">Horario preferido</span>
                  <span style="font-size:15px;font-weight:600;color:#f1f5f9;">${preferredTime || '—'}</span>
                </td>
              </tr>
              <tr>
                <td width="50%" style="vertical-align:top;">
                  <span style="font-size:11px;color:#64748b;display:block;margin-bottom:4px;text-transform:uppercase;">Email</span>
                  <a href="mailto:${email}" style="font-size:15px;color:${accent};text-decoration:none;font-weight:600;">${email || '—'}</a>
                </td>
                <td width="50%" style="vertical-align:top;">
                  <span style="font-size:11px;color:#64748b;display:block;margin-bottom:4px;text-transform:uppercase;">WhatsApp</span>
                  <a href="https://wa.me/${(phone || '').replace(/\D/g, '')}" style="font-size:15px;color:${accent};text-decoration:none;font-weight:600;">${phone || '—'}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
 
        <tr><td style="height:12px;"></td></tr>
 
        <!-- FORM DATA -->
        <tr>
          <td style="background:${card};border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:28px 32px;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${accent};font-weight:700;">Datos del formulario</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              ${row('¿Tiene tienda?', hasStore ?? '')}
              ${row('Tamaño de catálogo', catalogSize ?? '')}
              ${row('Presupuesto mensual', budget ?? '')}
              ${row('Intereses', Array.isArray(interests) && interests.length ? interests.join(', ') : '—')}
            </table>
          </td>
        </tr>
 
        <!-- CTA -->
        <tr>
          <td style="padding:24px 0;text-align:center;">
            <a href="mailto:${email}" style="display:inline-block;padding:14px 32px;background:${accent};color:#000000;font-weight:700;font-size:14px;border-radius:12px;text-decoration:none;letter-spacing:0.3px;">
              Responder a ${name || 'este lead'} →
            </a>
          </td>
        </tr>
 
        <!-- FOOTER -->
        <tr>
          <td style="text-align:center;padding-top:8px;">
            <p style="margin:0;font-size:12px;color:#334155;line-height:1.6;">
              Lead recibido vía Landing Page — Protolylat<br/>
              © ${new Date().getFullYear()} Protolylat. Todos los derechos reservados.
            </p>
          </td>
        </tr>
 
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}