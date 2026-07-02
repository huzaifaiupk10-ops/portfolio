function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendEmail(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Email delivery failed');
  }
  return res.json();
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, date, time, projectType } = JSON.parse(event.body || '{}');

    if (!name || !email || !date || !time || !projectType) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'All booking fields are required.' }),
      };
    }

    const sName        = escHtml(name.trim());
    const sEmail       = escHtml(email.trim());
    const sDate        = escHtml(date.trim());
    const sTime        = escHtml(time.trim());
    const sProjectType = escHtml(projectType.trim());
    const apiKey       = process.env.RESEND_API_KEY;

    const row = (label, value) =>
      `<tr><td style="padding:10px 0;color:#888;font-size:13px;width:120px;vertical-align:top;">${label}</td><td style="padding:10px 0;color:#fff;font-size:15px;font-weight:500;">${value}</td></tr>`;

    // Email to Huzaifa
    await sendEmail(apiKey, {
      from: 'Portfolio Booking <onboarding@resend.dev>',
      to: ['huzaifaiupk10@gmail.com'],
      reply_to: email.trim(),
      subject: `📅 Booking Request from ${sName}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="border-bottom:1px solid #222;padding-bottom:24px;margin-bottom:28px;">
      <span style="font-size:13px;font-weight:600;color:#C9A84C;letter-spacing:0.12em;text-transform:uppercase;">New Call Request</span>
      <h1 style="color:#fff;font-size:26px;margin:8px 0 0;font-weight:700;">Booking from ${sName}</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
      ${row('Name', sName)}
      ${row('Email', `<a href="mailto:${sEmail}" style="color:#C9A84C;text-decoration:none;">${sEmail}</a>`)}
      ${row('Date', sDate)}
      ${row('Time', sTime)}
      ${row('Project', sProjectType)}
    </table>
    <a href="mailto:${sEmail}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;">
      Reply to Confirm →
    </a>
    <p style="color:#444;font-size:12px;margin-top:32px;">Sent via your portfolio chatbot booking flow</p>
  </div>
</body>
</html>`,
    });

    // Confirmation email to visitor
    await sendEmail(apiKey, {
      from: 'Huzaifa Imran <onboarding@resend.dev>',
      to: [email.trim()],
      reply_to: 'huzaifaiupk10@gmail.com',
      subject: 'Your call request has been received ✓',
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="border-bottom:1px solid #222;padding-bottom:24px;margin-bottom:28px;">
      <span style="font-size:13px;font-weight:600;color:#C9A84C;letter-spacing:0.12em;text-transform:uppercase;">Booking Confirmed</span>
      <h1 style="color:#fff;font-size:26px;margin:8px 0 0;font-weight:700;">Thanks, ${sName}!</h1>
    </div>
    <p style="color:#ccc;font-size:15px;line-height:1.75;margin-bottom:28px;">
      Your call request has been received. Huzaifa will confirm your appointment at this email address shortly.
    </p>
    <div style="background:#141414;border-radius:10px;border-left:3px solid #C9A84C;padding:20px 24px;margin-bottom:32px;">
      <p style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px;">Your Request Summary</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row('Date', sDate)}
        ${row('Time', sTime)}
        ${row('Project', sProjectType)}
      </table>
    </div>
    <p style="color:#888;font-size:14px;line-height:1.7;">
      Questions? Email directly at
      <a href="mailto:huzaifaiupk10@gmail.com" style="color:#C9A84C;text-decoration:none;">huzaifaiupk10@gmail.com</a>
      or call <a href="tel:+15714774920" style="color:#C9A84C;text-decoration:none;">+1 571 477 4920</a>.
    </p>
    <p style="color:#444;font-size:12px;margin-top:32px;">Huzaifa Imran · Portfolio · roaring-bunny-7ee9b2.netlify.app</p>
  </div>
</body>
</html>`,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Booking error:', err.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
