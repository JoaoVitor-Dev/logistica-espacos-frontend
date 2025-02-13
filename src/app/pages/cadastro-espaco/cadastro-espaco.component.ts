import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-cadastro-espaco',
  templateUrl: './cadastro-espaco.component.html',
  styleUrls: ['./cadastro-espaco.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule
  ]
})
export class CadastroEspacoComponent implements OnInit {
  spaceForm: FormGroup;
  
  spaceTypes = [
    { value: 'sala_aula', label: 'Sala de Aula' },
    { value: 'auditorio', label: 'Auditório' },
    { value: 'laboratorio', label: 'Laboratório' }
  ];

  statusOptions = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'inativo', label: 'Inativo' },
    { value: 'manutencao', label: 'Em Manutenção' }
  ];

  availableResources = [
    { value: 'projetor', label: 'Projetor' },
    { value: 'som', label: 'Sistema de Som' },
    { value: 'quadro', label: 'Quadro Branco' },
    { value: 'computadores', label: 'Computadores' },
    { value: 'ar_condicionado', label: 'Ar Condicionado' },
    { value: 'outros', label: 'Outros' }
  ];

  constructor(private fb: FormBuilder) {
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
        outros: [false]
      }),
      registrationDate: ['', Validators.required],
      procedureDate: ['', Validators.required],
      status: ['', Validators.required],
      location: ['', Validators.required],
      additionalNotes: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.spaceForm.valid) {
      console.log(this.spaceForm.value);
      // Handle form submission
    }
  }

  onCancel(): void {
    this.spaceForm.reset();
  }
}