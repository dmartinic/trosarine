import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { MotocikliForm } from './motocikli-form';
import { AutomobiliService } from '../automobili.service';

@Component({
  selector: 'app-motocikli',
  templateUrl: './motocikli.component.html',
  styleUrls: ['./motocikli.component.css']
})
export class MotocikliComponent implements OnInit {

  constructor(private automobiliService: AutomobiliService) { }

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: false,
    openSelectorTopOfInput: true,
    showSelectorArrow: false
  };

  model = new MotocikliForm(null, "EURO IV", 0);

  Koeficijent
  PostotakZaRabljeno
  PorezZaNovo;
  PorezZaRabljeno;
  SubmitedCCM;

  DataPadVrijednosti;
  DataCCMKoeficijenti;

  submitted = false;
  noviMotor = true;

  datumChanged() {
    if (this.model.datum) {

      let today = new Date();
      let selectedDate = new Date(0);
      selectedDate.setUTCSeconds(this.model.datum["epoc"])
      let ukupnoMjeseci = (today.getMonth() - selectedDate.getMonth()) + 12 * (today.getFullYear() - selectedDate.getFullYear());

      if (ukupnoMjeseci >= 0) {
        this.model.starost = ukupnoMjeseci;
      }
      else {
        this.model.starost = 0;
      }
    }
  }

  onSubmit() {
    if (this.DataCCMKoeficijenti && this.DataPadVrijednosti) {
      this.submitted = true;

      this.SubmitedCCM = this.model.obujam;

      this.DataCCMKoeficijenti.koeficijenti.forEach(x => {
        if (x.obujam <= this.model.obujam) {
          this.Koeficijent = x.koef;
        }
      });

      if (this.model.emisija == "EURO I") this.Koeficijent += 15;
      if (this.model.emisija == "EURO II") this.Koeficijent += 10;
      if (this.model.emisija == "EURO III") this.Koeficijent += 5;

      this.PorezZaNovo = this.Koeficijent * this.model.obujam;

      if (this.model.starost > 0) {
        this.noviMotor = false;
        this.PostotakZaRabljeno = 100;
        this.DataPadVrijednosti.vrijednost.forEach(x => {
          if (x.starost <= this.model.starost) {
            this.PostotakZaRabljeno = x.postotak;
          }
        });
        this.PorezZaRabljeno = this.PorezZaNovo * this.PostotakZaRabljeno / 100;
      }
      else {
        this.noviMotor = true;
      }

    }
  }


   ngOnInit() {
    this.automobiliService.getDataPadVrijednosti().subscribe(x => this.DataPadVrijednosti = x);
    this.automobiliService.getDataCCMKoeficijenti().subscribe(x => this.DataCCMKoeficijenti = x);

  }
}
