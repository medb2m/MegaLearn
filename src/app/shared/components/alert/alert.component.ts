import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '@app/_models';
import { AlertService } from '@app/_services';

@Component({ selector: 'alert', templateUrl: 'alert.component.html', styleUrls: ['alert.component.css'] })
export class AlertComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';
    @Input() fade = true;

    alerts: Alert[] = [];
    alertSubscription!: Subscription;
    routeSubscription!: Subscription;

    constructor(private router: Router, private alertService: AlertService) { }

    ngOnInit() {
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                if (!alert.message) {
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                    this.alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }

                this.alerts.push(alert);

                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000);
                }
            });

        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });
    }

    ngOnDestroy() {
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeAlert(alert: Alert) {
        if (!this.alerts.includes(alert)) return;

        if (this.fade) {
            alert.fade = true;

            setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert);
            }, 250);
        } else {
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    }

    getAlertClass(alert: Alert): string {
        switch (alert.type) {
            case AlertType.Success: return 'alert alert-success d-flex';
            case AlertType.Error: return 'alert alert-danger d-flex';
            case AlertType.Info: return 'alert alert-primary d-flex';
            case AlertType.Warning: return 'alert alert-warning d-flex';
            default: return 'alert d-flex';
        }
    }

    getAlertIcon(alert: Alert): string {
        switch (alert.type) {
            case AlertType.Success: return 'bi bi-check-circle-fill';
            case AlertType.Error: return 'bi bi-exclamation-triangle-fill';
            case AlertType.Info: return 'bi bi-info-circle-fill';
            case AlertType.Warning: return 'bi bi-exclamation-triangle-fill';
            default: return '';
        }
    }
}