import { Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { EspacoService } from '../../services/espaco.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Espaco, RecursoDisponivel } from '../../interfaces/espaco.interface';
import { MatSelect } from '@angular/material/select';

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
  @ViewChild('tipoSelect') tipoSelect!: MatSelect;

  id!: number;
  spaceForm: FormGroup;

 recursosBackendParaForm: { [key: string]: string } = {
  'Projetor': 'projetor',
  'Sistema de Som': 'som',
  'Quadro Branco': 'quadro',
  'Computadores': 'computadores',
  'Ar Condicionado': 'ar_condicionado',
  'Outros': 'outros'
 };

  constructor(
    private fb: FormBuilder,
    private espacoService: EspacoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.carregarDadosEspaco(this.id);
      }
    });
  }

  carregarDadosEspaco(id: number) {
    const formatarParaDataBrasileira = (dateStr: string): Date => {
      if (!dateStr) throw new Error("Data inválida");
      const [ano, mes, dia] = dateStr.split('-').map(Number);
      return new Date(ano, mes - 1, dia);
    };
  
    const mapearTipoParaSelect = (tipo: string): string => {
      const tipoMap: { [key: string]: string } = {
        'SALA_AULA': 'sala_aula',
        'AUDITORIO': 'auditorio',
        'LABORATORIO': 'laboratorio'
      };
      return tipoMap[tipo] || tipo.toLowerCase();
    };
  
    const mapearStatusParaSelect = (status: string): string => {
      const statusMap: { [key: string]: string } = {
        'ATIVO': 'ativo',
        'INATIVO': 'inativo',
        'MANUTENCAO': 'manutencao'
      };
      return statusMap[status] || status.toLowerCase();
    };
  
    this.espacoService.obterEspacoPorId(id).subscribe({
      next: (espaco) => {
        const recursos = this.fb.group({
          projetor: [false],
          som: [false],
          quadro: [false],
          computadores: [false],
          ar_condicionado: [false],
          outros: [false]
        });

        if (espaco.recursosDisponiveis && espaco.recursosDisponiveis.length > 0) {
          Object.keys(recursos.controls).forEach(key => {
            recursos.get(key)?.setValue(false);
          });
          
          espaco.recursosDisponiveis.forEach(recurso => {
            const nomeRecurso = recurso.nome.trim();
            const chaveForm = this.recursosBackendParaForm[nomeRecurso] || 
                              this.recursosBackendParaForm[nomeRecurso.toLowerCase()] ||
                              nomeRecurso.toLowerCase().replace(/\s+/g, '_');
            
            console.log(`Tentando mapear recurso "${nomeRecurso}" para "${chaveForm}"`);
            
            if (recursos.get(chaveForm)) {
              recursos.get(chaveForm)?.setValue(true);
              console.log(`Checkbox "${chaveForm}" marcado como selecionado`);
            } else {
              console.log(`Não foi possível encontrar controle para "${chaveForm}"`);
            }
          });
        }
  
        const tipoMapeado = mapearTipoParaSelect(espaco.tipo);
        const statusMapeado = mapearStatusParaSelect(espaco.status);
  
        this.spaceForm.patchValue({
          name: espaco.nome,
          description: espaco.descricao,
          type: tipoMapeado,
          capacity: espaco.capacidade,
          status: statusMapeado,
          location: espaco.localizacao,
          registrationDate: formatarParaDataBrasileira(espaco.dataCadastro),
          procedureDate: formatarParaDataBrasileira(espaco.dataProcedimento),
          additionalNotes: espaco.notasAdicionais,
          resources: recursos.value
        });
  
        console.log('Formulário preenchido:', this.spaceForm.value);
        console.log('Tipo mapeado:', tipoMapeado);
        console.log('Status mapeado:', statusMapeado);
      },
      error: (error) => {
        console.error('Erro ao carregar dados do espaço:', error);
      }
    });
  }

  selecionarTipo(tipo: string): void {
    const tipoExistente = this.spaceTypes.find(t => t.value === tipo);
    if (tipoExistente) {
      console.log(tipoExistente.value)
      this.spaceForm.patchValue({ type: tipoExistente.value });
    }
  }

  novoEspaco(): void {
    if (this.spaceForm.valid) {
      const formValues = this.spaceForm.value;
  
      const recursosSelecionados: RecursoDisponivel[] = Object.entries(formValues.resources)
        .filter(([_, isSelected]) => isSelected)
        .map(([resourceKey, _], index) => {
          const resourceInfo = this.availableResources.find(r => r.value === resourceKey);
          return {
            id: index + 1,
            nome: resourceInfo?.label || resourceKey,
            descricao: `Recurso ${resourceInfo?.label || resourceKey} disponível no espaço`
          };
        });
  
      const mapearTipo = (type: string): string => {
        const typeMap: { [key: string]: string } = {
          'sala_aula': 'SALA_AULA',
          'auditorio': 'AUDITORIO',
          'laboratorio': 'LABORATORIO'
        };
        return typeMap[type] || type.toUpperCase();
      };
  
      const formatarData = (date: Date): string => {
        if (!date) return '';
        const dateObj = new Date(date);
        return dateObj.toISOString().split('T')[0];
      };
  
      const mapearStatus = (status: string): string => {
        const statusMap: { [key: string]: string } = {
          'ativo': 'ATIVO',
          'inativo': 'INATIVO',
          'manutencao': 'MANUTENCAO'
        };
        return statusMap[status] || status.toUpperCase();
      };
  
      const payload: Partial<Espaco> = {
        nome: formValues.name,
        tipo: mapearTipo(formValues.type),
        capacidade: formValues.capacity,
        localizacao: formValues.location,
        status: mapearStatus(formValues.status),
        descricao: formValues.description,
        recursosDisponiveis: recursosSelecionados,
        dataCadastro: formatarData(formValues.registrationDate),
        dataProcedimento: formatarData(formValues.procedureDate),
        notasAdicionais: formValues.additionalNotes || ''
      };
  
      if (this.id) {
        payload.id = this.id;
        console.log(payload)
        this.espacoService.atualizarEspaco(payload as any).subscribe({
          next: (response) => {
            console.log('Espaço atualizado com sucesso:', response);
            this.spaceForm.reset();
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Erro ao atualizar espaço:', error);
          }
        });
      } else {
        this.espacoService.criarEspaco(payload as any).subscribe({
          next: (response) => {
            console.log('Espaço criado com sucesso:', response);
            this.spaceForm.reset();
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Erro ao criar espaço:', error);
          }
        });
      }
    } else {
      Object.keys(this.spaceForm.controls).forEach(key => {
        const control = this.spaceForm.get(key);
        control?.markAsTouched();
      });
    }
  }

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

  onSubmit(): void {
    if (this.spaceForm.valid) {
      console.log(this.spaceForm.value);
    }
  }

  onCancel(): void {
    this.spaceForm.reset();
    this.router.navigate(['/']);
  }
}
