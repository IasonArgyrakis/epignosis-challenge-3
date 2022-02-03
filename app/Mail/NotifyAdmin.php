<?php

namespace App\Mail;

use App\Models\Application;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NotifyAdmin extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var Application
     */
    public $application;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Application $application)
    {
        $this->application =$application;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this->from('pobiyay524@kruay.com', 'Example')
            ->view('admin');

    }
}
