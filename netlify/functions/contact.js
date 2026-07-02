function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, message } = JSON.parse(event.body || '{}');

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'All fields are required.' }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Please enter a valid email address.' }),
      };
    }

    const sName    = escHtml(name.trim());
    const sEmail   = escHtml(email.trim());
    const sMessage = escHtml(message.trim()).replace(/\n/g, '<br>');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['huzaifaiupk10@gmail.com'],
        reply_to: email.trim(),
        subject: `New message from ${sName}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="border-bottom:1px solid #222;padding-bottom:24px;margin-bottom:28px;">
      <span style="font-size:13px;font-weight:600;color:#C9A84C;letter-spacing:0.12em;text-transform:uppercase;">Portfolio Contact</span>
      <h1 style="color:#fff;font-size:26px;margin:8px 0 0;font-weight:700;">New message from ${sName}</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
      <tr>
        <td style="padding:10px 0;color:#888;font-size:13px;width:80px;vertical-align:top;">Name</td>
        <td style="padding:10px 0;color:#fff;font-size:15px;font-weight:500;">${sName}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Email</td>
        <td style="padding:10px 0;font-size:15px;">
          <a href="mailto:${sEmail}" style="color:#C9A84C;text-decoration:none;">${sEmail}</a>
        </td>
      </tr>
    </table>
    <div style="background:#141414;border-radius:10px;border-left:3px solid #C9A84C;padding:20px 24px;margin-bottom:32px;">
      <p style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px;">Message</p>
      <p style="color:#e8e8e8;font-size:15px;line-height:1.75;margin:0;">${sMessage}</p>
    </div>
    <a href="mailto:${sEmail}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:0.02em;">
      Reply to ${sName} →
    </a>
    <p style="color:#444;font-size:12px;margin-top:32px;">Sent via huzaifa-portfolio · roaring-bunny-7ee9b2.netlify.app</p>
  </div>
</body>
</html>`,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Email delivery failed');
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Contact error:', err.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
