import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'rules',
  template: `
        <h1>Правила</h1>
        <div class="description theme-color-background-third">
            <p>Предоставляя свои персональные данные Пользователь даёт согласие на обработку, хранение и использование своих персональных данных на основании ФЗ № 152-ФЗ «О персональных данных» от 27.07.2006 г. в следующих целях:</p>

            <ul>
              <li>Регистрации Пользователя на сайте</li>
              <li>Осуществление клиентской поддержки</li>
              <li>Получения Пользователем информации о маркетинговых событиях</li>
              <li>Проведения аудита и прочих внутренних исследований с целью повышения качества предоставляемых услуг.</li>
            </ul>
            <p>Под персональными данными подразумевается любая информация личного характера, позволяющая установить личность Пользователя такая как:</p>
            <ul>
              <li>Адрес электронной почты</li>
            </ul>
            <p>Персональные данные Пользователей хранятся исключительно на электронных носителях и обрабатываются с использованием автоматизированных систем, за исключением случаев, когда неавтоматизированная обработка персональных данных необходима в связи с исполнением требований законодательства.</p>

            <p>Продавец обязуется не передавать полученные персональные данные третьим лицам, за исключением следующих случаев:</p>

            <ul>
              <li>По запросам уполномоченных органов государственной власти РФ только по основаниям и в порядке, установленным законодательством РФ</li>

              <li>Стратегическим партнерам, которые работают с Продавцом для предоставления продуктов и услуг, или тем из них, которые помогают Продавцу реализовывать продукты и услуги потребителям. Мы предоставляем третьим лицам минимальный объем персональных данных, необходимый только для оказания требуемой услуги или проведения необходимой транзакции.</li>
            </ul>
            <p>Продавец оставляет за собой право вносить изменения в одностороннем порядке в настоящие правила, при условии, что изменения не противоречат действующему законодательству РФ. Изменения условий настоящих правил вступают в силу после их публикации на сайте.</p>

        </div>
        <div class="side-panel">
            <a (click)="location.back()" class="side-panel__item">back</a>
        </div>
        `,
  styleUrls: [ './rules.component.scss' ]
})
export class RulesComponent {
  constructor(public location: Location) { }
}
