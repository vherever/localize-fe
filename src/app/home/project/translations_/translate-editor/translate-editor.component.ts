import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// app imports
import { TranslationModel } from '../../../../core/models/translation.model';
import { UserModel } from '../../../../core/models/user.model';
import { ProjectModel } from '../../../../core/models/project.model';

interface TranslateEditorModel {
  editInLanguage: string;
  translation: string;
}

@Component({
  templateUrl: 'translate-editor.component.html',
})
export class TranslateEditorComponent implements OnInit {
  @Input() projectId: number;
  @Input() translation: TranslationModel;
  @Input() userData: UserModel;

  @Output() newTranslationData: EventEmitter<any> = new EventEmitter();

  translateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    const projectData = this.userData.projects.find((p: ProjectModel) => p.id === this.projectId);
    const projectDefaultLocale = projectData.defaultLocale;

    this.translateForm = this.fb.group({
      editInLanguage: [projectDefaultLocale],
      translation: [this.translation.translations[projectDefaultLocale]],
    });
  }

  onSaveTranslation(): void {
    const data = {
      assetCode: this.translation.assetCode,
      translations: JSON.stringify(this.buildFullTranslation(this.translateForm.value.editInLanguage, this.translateForm.value))
    };

    this.newTranslationData.emit(data);
  }

  onLanguageEditChange(lang: string): void {
    this.translateForm.controls['translation'].setValue(this.translation.translations[lang]);
  }

  private buildFullTranslation(currentLang: string, currentFormValue: TranslateEditorModel): any {
    const currentTranslation = { [currentFormValue.editInLanguage]: currentFormValue.translation };
    const translationsCloned = JSON.parse(JSON.stringify(this.translation.translations));
    delete translationsCloned[currentLang];
    return Object.assign(translationsCloned, currentTranslation);
  }
}
