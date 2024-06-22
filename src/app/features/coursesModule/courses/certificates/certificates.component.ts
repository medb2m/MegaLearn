import { Component, OnInit } from '@angular/core';
import { CertificatesService } from '@app/_services/certificates.service';

@Component({
    selector: 'app-my-courses',
    templateUrl: './certificates.component.html',
    styleUrls: ['./certificates.component.css']
})
export class certificatesComponent implements OnInit {

  certificates: any[] = [];

  constructor(private certificatesService: CertificatesService) { }

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates() {
    this.certificatesService.getAll()
      .subscribe(certificates => {
        console.log(certificates)
        this.certificates = certificates;
      }, error => {
        console.error('Error fetching certificates', error);
      });
  }

  /* downloadCertificate(certificateId: string) {
    console.log('hello')
    this.certificatesService.downloadCertificate(certificateId)
      .subscribe(blob => {
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        this.certificatesService.getCertificatesById(certificateId).subscribe( x => link.download = x.certificateLink)
        link.click()
      }, error => {
        console.error('Error downloading certificate', error);
      });
  }
 */

  downloadCertificate(certificateId: string) {
    console.log('hello');
    this.certificatesService.downloadCertificate(certificateId)
      .subscribe(blob => {
        const fileURL = window.URL.createObjectURL(blob);
        this.certificatesService.getCertificatesById(certificateId).subscribe(certificate => {
          const newWindow = window.open(fileURL);
          if (newWindow) {
            newWindow.onload = () => {
              newWindow.document.title = certificate.certificateLink;
            };
          } else {
            console.error('Failed to open new window');
          }
        });
      }, error => {
        console.error('Error downloading certificate', error);
      });
  }
  
}
