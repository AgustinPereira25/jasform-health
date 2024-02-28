<?php

namespace Support\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'to_email' => 'required|email',
        ]);

        $to_email = $request->to_email;

        Mail::send([], [], function ($message) use ($to_email) {
            $message->to($to_email)
                    ->subject('Email from Laravel')
                    ->text('This is a test email sent from Laravel.');
        });

        return "Email sent to $to_email";
    }
}
