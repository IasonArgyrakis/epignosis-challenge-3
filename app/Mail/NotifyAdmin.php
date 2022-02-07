<?php

namespace App\Mail;

use App\Models\Application;
use http\Client\Curl\User;
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
    public $adminId;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Application $application, $adminId)
    {
        $this->application = $application;
        $this->adminId = $adminId;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this->from('system@example.com','Domain.com')
            ->subject( 'New Leave Request from '.$this->application->applicant."(".$this->application->start.'-'.$this->application->end.")")
            ->view('admin');

    }
}
