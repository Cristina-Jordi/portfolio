import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @ViewChild('myForm') myForm!: ElementRef;
  @ViewChild('nameField') nameField!: ElementRef;
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('messageField') messageField!: ElementRef;
  @ViewChild('sendButton') sendButton!: ElementRef;
  formSubmitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  async sendMail() {
    console.log('Sending mail', this.myForm);
    let nameField = this.nameField.nativeElement;
    let messageField = this.messageField.nativeElement;
    let sendButton = this.sendButton.nativeElement;

    nameField.disabled = true;
    messageField.disabled = true;
    sendButton.disabled = true;

    let fd = new FormData();
    fd.append('name', nameField.value);
    fd.append('message', messageField.value);

    await fetch('https://cristina-jordi.developerakademie.net/portfolio/send_mail/send_mail.php',
      {
        method: 'POST',
        body: fd
      });

    console.log('E-mail sent successfully!');

    this.formSubmitted = true;

    setTimeout(() => {
      this.formSubmitted = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });

      nameField.value = '';
      this.emailField.nativeElement.value = '';
      messageField.value = '';

      // Reset Border-Styles
      nameField.classList.remove('valid-field');
      this.emailField.nativeElement.classList.remove('valid-field');
      messageField.classList.remove('valid-field');
    }, 5000);

    nameField.disabled = false;
    messageField.disabled = false;
    sendButton.disabled = false;
  }

  validateFields() {
    // Check Fields if correct and border style
    let nameField = this.nameField.nativeElement;
    let emailField = this.emailField.nativeElement;
    let messageField = this.messageField.nativeElement;

    // Validate Name-Field
    if (nameField.value.trim() !== '') {
      nameField.classList.add('valid-field');
    } else {
      nameField.classList.remove('valid-field');
    }

    // Validate Email-Field
    if (this.validateEmail(emailField.value.trim())) {
      emailField.classList.add('valid-field');
    } else {
      emailField.classList.remove('valid-field');
    }

    // Validate Message-Field
    if (messageField.value.trim() !== '') {
      messageField.classList.add('valid-field');
    } else {
      messageField.classList.remove('valid-field');
    }
  }

  validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}