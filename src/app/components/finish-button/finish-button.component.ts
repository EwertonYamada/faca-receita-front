import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-finish-button',
  standalone: true,
  imports: [],
  templateUrl: './finish-button.component.html',
  styleUrl: './finish-button.component.scss'
})
export class FinishButtonComponent {
  @Input() confirmLabel: string = 'Salvar'
  @Output() onConfirm = new EventEmitter<void>()
  @Output() onCancel = new EventEmitter<void>()
  @Input() disabledConfirmButton: boolean = false;

  confirm(): void {
    this.onConfirm.emit()
  }

  cancel(): void {
    this.onCancel.emit()
  }
}
