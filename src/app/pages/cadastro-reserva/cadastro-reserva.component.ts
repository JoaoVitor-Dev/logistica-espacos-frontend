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
import { Espaco } from '../../interfaces/espaco.interface';

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
  reservationForm!: FormGroup;

  espacos: Espaco[] = [];

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
    this.reservationForm.reset();
    this.router.navigate(['/']);
  }
  onSubmit() {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.reservationForm = this.fb.group({
      space: ['', Validators.required],
      nameEvent: ['', Validators.required],
      typeEvent: ['', Validators.required],
      registrationReserve: ['', Validators.required],
      period: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      situation: ['', Validators.required],
      responsability: ['', Validators.required],
      observation: [''] 
    });
    this.carregarEspacos();
  }

  carregarEspacos(){
    this.espacoService.obterEspacos().subscribe({
      next: (data) => {
        console.log(data)
        this.espacos = data;
      },
      error: (error) => {
        console.error('Error fetching espacos:', error);
      }
    });
  }
}
