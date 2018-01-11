import { Component, OnInit } from '@angular/core';
import { AutomobiliForm } from './automobili-form';
import { AutomobiliService } from '../automobili.service';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-automobili',
  templateUrl: './automobili.component.html',
  styleUrls: ['./automobili.component.css']
})

export class AutomobiliComponent implements OnInit {

  constructor(private automobiliService: AutomobiliService) { }

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: false,
    openSelectorTopOfInput: true,
    showSelectorArrow: false,
    sunHighlight: false
  };

  model = new AutomobiliForm(null, "Diesel", null, 0);

  DataPostotci;
  DataPostotci2017;
  DataNaknadeCO2;
  DataPadVrijednosti;

  PostotakOdProdajneCijene;
  PostotakOdProdajneCijene2017;
  VrijednosnaNaknada;
  UkupnoPostotak;
  UkupnoPostotak2017;
  ONENNaknada;
  PorezZaNovo;
  PorezZaNovo2017;
  PorezZaRabljeno;
  PorezZaRabljeno2017;
  PostotakZaRabljeno;
  SubmitedCijena;
  NajnizaCijena;

  submitted = false;
  noviAuto = true;

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

  starostChanged() {
    this.model.datum = null;
  }

  onSubmit() {
    if (this.DataPostotci && this.DataNaknadeCO2 && this.DataPadVrijednosti) {
      this.submitted = true;
      this.SubmitedCijena = this.model.cijena;

      this.DataPostotci.postotci.forEach(x => {
        if (x.cijena < this.model.cijena) {
          this.PostotakOdProdajneCijene = x.postotak;
          this.VrijednosnaNaknada = x.vn;
          this.NajnizaCijena = x.cijena;
        }
      });
      this.UkupnoPostotak = this.VrijednosnaNaknada + ((this.model.cijena - this.NajnizaCijena) * (this.PostotakOdProdajneCijene / 100));

      this.DataPostotci2017.postotci.forEach(x => {
        if (x.cijena < this.model.cijena) {
          this.PostotakOdProdajneCijene2017 = x.postotak;
        }
      });
      this.UkupnoPostotak2017 = this.model.cijena * (this.PostotakOdProdajneCijene2017 / 100);


      let osnovnaNaknada;
      let dodatnaNaknada;
      let kolikoDodatne;

      this.DataNaknadeCO2[this.model.tipgoriva.toLowerCase()]["osnovna"].forEach(x => {
        if (x.co2 < this.model.co2) {
          osnovnaNaknada = x.naknada;
        }
      });

      this.DataNaknadeCO2[this.model.tipgoriva.toLowerCase()]["dodatna"].forEach(x => {
        if (x.co2 < this.model.co2) {
          dodatnaNaknada = x.naknada;
          kolikoDodatne = x.co2;
        }
      });

      this.ONENNaknada = osnovnaNaknada + dodatnaNaknada * (this.model.co2 - kolikoDodatne);
      this.PorezZaNovo = this.UkupnoPostotak + this.ONENNaknada;
      this.PorezZaNovo2017 = this.UkupnoPostotak2017 + this.ONENNaknada;

      if (this.model.starost > 0) {
        this.noviAuto = false;
        this.PostotakZaRabljeno = 100;
        this.DataPadVrijednosti.vrijednost.forEach(x => {
          if (x.starost <= this.model.starost) {
            this.PostotakZaRabljeno = x.postotak;
          }
        });
        this.PorezZaRabljeno = this.PorezZaNovo * this.PostotakZaRabljeno / 100;
        this.PorezZaRabljeno2017 = this.PorezZaNovo2017 * this.PostotakZaRabljeno / 100;
      }
      else {
        this.noviAuto = true;
      }
    }
  }

  ngOnInit() {
    this.automobiliService.getDataPostotci().subscribe(x => this.DataPostotci = x);
    this.automobiliService.getDataPostotci2017().subscribe(x => this.DataPostotci2017 = x);
    this.automobiliService.getDataNaknade().subscribe(x => this.DataNaknadeCO2 = x);
    this.automobiliService.getDataPadVrijednosti().subscribe(x => this.DataPadVrijednosti = x);
  }

}
