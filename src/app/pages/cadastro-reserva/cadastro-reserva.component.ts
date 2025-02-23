import { Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { EspacoService } from '../../services/espaco.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../../interfaces/reserva.interface';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-cadastro-reserva',
  templateUrl: './cadastro-reserva.component.html',
  styleUrls: ['./cadastro-reserva.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule,
  ],
})
export class CadastroReservaComponent implements OnInit {

  id!: number;
  spaceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private espacoService: EspacoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  salvarReserva() {
    throw new Error('Method not implemented.');
  }
  onCancel() {
    this.spaceForm.reset();
    this.router.navigate(['/']);
  }
  onSubmit() {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.spaceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      resources: this.fb.group({
        projetor: [false],
        som: [false],
        quadro: [false],
        computadores: [false],
        ar_condicionado: [false],
        outros: [false],
      }),
      registrationDate: ['', Validators.required],
      procedureDate: ['', Validators.required],
      status: ['', Validators.required],
      location: ['', Validators.required],
      additionalNotes: [''],
    });
  }
}
