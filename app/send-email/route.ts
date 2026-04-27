import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const mailPrimero = process.env.MAILPRIMERO || '';
/* const mailSegundo = process.env.MAILSEGUNDO || '';
const mailTercero = process.env.MAILTERCERO || ''; */

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, accessTier, level, lang } = body;

        /* const fromEmail = 'onboarding@resend.dev'; */ // Keeping resend default for now or using configured one
        const fromEmail = 'business@business.protolylat.com'

        if (!mailPrimero) {
            return NextResponse.json({ error: "ADMIN_EMAIL not configured" }, { status: 500 });
        }

        const recipients = [mailPrimero];
        if (mailSegundo) recipients.push(mailSegundo);

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: [mailPrimero],
            // cc: [mailSegundo, mailTercero], //lo que va
            subject: `Nuevo Lead: Landing Page en 3 Horas — ${name}`,
            html: buildEmailHtml({ name, email, phone, accessTier, level, lang }),
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

function buildEmailHtml({
    name,
    email,
    phone,
    accessTier,
    level,
    lang,
}: {
    name?: string;
    email?: string;
    phone?: string;
    accessTier?: string;
    level?: string;
    lang?: string;
}) {
    const isEn = lang === "en";
    const accentColor = "#C9A84C";
    const bgColor = "#020617";
    const cardBg = "#0F172A";
    
    return `
<!DOCTYPE html>
<html lang="${isEn ? "en" : "es"}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${isEn ? "New Workshop Lead" : "Nuevo Lead del Taller"}</title>
</head>
<body style="margin:0;padding:0;background-color:${bgColor};font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${bgColor};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="padding-bottom:32px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:4px;text-transform:uppercase;color:${accentColor};font-weight:700;">
                ${isEn ? "New Enrollment" : "Nueva Inscripción"}
              </p>
              <h1 style="margin:0;font-size:32px;font-weight:800;color:#FFFFFF;line-height:1.2;letter-spacing:-0.5px;">
                ${isEn ? "Landing Page in 3 Hours" : "Landing Page en 3 Horas"}
              </h1>
            </td>
          </tr>

          <!-- CONTACT CARD -->
          <tr>
            <td style="background-color:${cardBg};border:1px solid rgba(201,168,76,0.2);border-radius:24px;padding:32px;margin-bottom:24px;box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding-bottom:24px;">
                    <span style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${accentColor};display:block;margin-bottom:8px;font-weight:600;">
                      ${isEn ? "Lead Name" : "Nombre del Lead"}
                    </span>
                    <span style="font-size:24px;font-weight:800;color:#FFFFFF;">${name || "—"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:20px;">
                    <div style="height:1px;background:rgba(255,255,255,0.1);width:100%;"></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="50%" style="padding-bottom:16px;vertical-align:top;">
                          <span style="font-size:11px;color:#94A3B8;display:block;margin-bottom:4px;text-transform:uppercase;">${isEn ? "Email Address" : "Correo Electrónico"}</span>
                          <a href="mailto:${email}" style="font-size:15px;color:${accentColor};text-decoration:none;font-weight:600;">${email || "—"}</a>
                        </td>
                        <td width="50%" style="padding-bottom:16px;vertical-align:top;">
                          <span style="font-size:11px;color:#94A3B8;display:block;margin-bottom:4px;text-transform:uppercase;">WhatsApp</span>
                          <a href="https://wa.me/${(phone || "").replace(/\D/g, "")}" style="font-size:15px;color:${accentColor};text-decoration:none;font-weight:600;">${phone || "—"}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:16px;"></td></tr>

          <!-- WORKSHOP DETAILS -->
          <tr>
            <td style="background-color:${cardBg};border:1px solid rgba(255,255,255,0.05);border-radius:24px;padding:32px;">
              <p style="margin:0 0 20px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${accentColor};font-weight:600;">
                ${isEn ? "Package Details" : "Detalles del Paquete"}
              </p>

              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="50%" style="padding-bottom:16px;vertical-align:top;">
                    <span style="font-size:11px;color:#94A3B8;display:block;margin-bottom:4px;text-transform:uppercase;">
                      ${isEn ? "Access Tier" : "Nivel de Acceso"}
                    </span>
                    <span style="font-size:16px;color:#FFFFFF;font-weight:700;">${accessTier || "—"}</span>
                  </td>
                  <td width="50%" style="padding-bottom:16px;vertical-align:top;">
                    <span style="font-size:11px;color:#94A3B8;display:block;margin-bottom:4px;text-transform:uppercase;">
                      ${isEn ? "Experience Level" : "Nivel de Experiencia"}
                    </span>
                    <span style="font-size:16px;color:#FFFFFF;font-weight:700;">${level || "—"}</span>
                  </td>
                </tr>
              </table>

              <div style="margin-top:20px;padding:16px;background-color:rgba(201,168,76,0.1);border-radius:12px;text-align:center;">
                <p style="margin:0;font-size:13px;color:${accentColor};font-weight:600;">
                  ${isEn ? "Ready to scale?" : "¿Listo para escalar?"}
                </p>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding-top:32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#475569;line-height:1.5;">
                ${isEn
            ? "This lead was submitted via the Lead Capture form on your Landing Page."
            : "Este lead fue enviado a través del formulario de captura en tu Landing Page."}
                <br/>
                © ${new Date().getFullYear()} Protolylat.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}