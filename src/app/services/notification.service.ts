import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  success(message: string): void {
    this.open(message, 'snackbar-success')
  }

  warning(message: string): void {
    this.open(message, 'snackbar-warning')
  }

  error(message: string): void {
    this.open(message, 'snackbar-error', 6000)
  }

  info(message: string): void {
    this.open(message, 'snackbar-info')
  }

  private open(
    message: string,
    panelClass: string,
    duration: number = 3000
  ): void {

    this.snackBar.open(message, 'x', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass]
    })
  }
}