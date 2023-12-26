# Note: Angular 17

- [Note: Angular 17](#note-angular-17)
  - [Create: Services](#create-services)
  - [Create: Resolvers](#create-resolvers)
  - [Create: Pipes](#create-pipes)
  - [Create: Directive](#create-directive)
  - [Create: Components](#create-components)
    - [Component Cycle de vie](#component-cycle-de-vie)
  - [Template Bindings](#template-bindings)
  - [Template Pipes](#template-pipes)
  - [Template Reference Variable](#template-reference-variable)
  - [Template Directives](#template-directives)
    - [Directives: structural directives](#directives-structural-directives)
    - [Directives: Attribute directives](#directives-attribute-directives)
    - [Directives: Other](#directives-other)
  - [Others](#others)
    - [Types Subject](#types-subject)
    - [Ref HTML in Component](#ref-html-in-component)

## Create: Services

Le service est une vaste catégorie englobant toute valeur, fonction ou fonctionnalité dont une application a besoin. Un service est généralement une classe ayant un objectif précis et bien défini.

```ts
@Injectable({ providedIn: 'root' })
export class ExampleService {

   public getHello(): string { 
      return "hello world"; 
   }

}
```

```ts
@Injectable({ providedIn: 'root' })
export class LoggerService {

   public log(msg: any): void { 
      console.log(msg); 
   }

   public error(msg: any): void { 
      console.error(msg); 
   }

   public warn(msg: any): void { 
      console.warn(msg);
   }
}
```

**🔝 [back to top](#note-angular-17)**

## Create: Resolvers

```ts
export const resolver: ResolveFn<string> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string => {
   return "hello"
};

export const resolver: ResolveFn<string> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> => {
   return of("hello");
};

export const resolver: ResolveFn<string> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> => {
   return new Promise(resolve => resolve("hello"));
};

// avec injection d'un service ! 
export const resolver: ResolveFn<string> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> => {
   return inject(ExampleService).fetchApi();
};
```

**🔝 [back to top](#note-angular-17)**

## Create: Pipes

lire: [template pipes](#template-pipes)

```ts
@Pipe({ name: 'myPipe' })
export class ExamplePipe implements PipeTransform {

   public transform(value: string): string {
      return value.toUpperCase();
   }
}
```

**🔝 [back to top](#note-angular-17)**

## Create: Directive

lire: [template directives](#template-directives)

```ts
@Directive({ selector: '[hoverHighlight]', standalone: true })
export class HoverHighlightDirective {
   private readonly _target: ElementRef;

   public constructor(target: ElementRef) {
      this._target = target;
   }

   @HostListener('mouseenter')
   public onMouseEnter() {
      this._target.nativeElement.style.color = "yellow";
   }

   @HostListener('mouseleave')
   public onMouseLeave() {
      this._target.nativeElement.style.color = "";
   } 
}
```

**🔝 [back to top](#note-angular-17)**

## Create: Components

En utilisant le HTML et le CSS dans des fichiers distincts :

```ts
@Component({
   selector: "example-component", standalone: true,
   templateUrl: "./example.component.html", 
   styleUrl: "./example.component.scss", 
   // template: `<p>inline HTML</p>`,        <<<< ou inline html
   // styles: `.inline { display: inline }`  <<<< ou inline css/scss
})
export class ExampleComponent { }
```

Example avec un SVG comme template

```ts
@Component({
  standalone: true, selector: 'app-svg',
  // templateUrl: './svg.component.svg', <<<< ou dans un fichier distinct...
  template: `<svg><g><rect x="0" y="0" width="100" height="100" [attr.fill]="fillColor"/></g></svg>`,
  styleUrls: ['./svg.component.css']
})
export class SvgComponent {
  fillColor = 'rgb(255, 0, 0)';
}
```

Avec des propriétés d'entrée

```ts
@Component({
   selector: "example-component", 
   standalone: true, 
   templateUrl: "./example.component.html" 
})
export class ExampleComponent {
  @Input() 
  public props1: number; 
  private _props2: number;

  public constructor() {
    this.props1 = 10; // Valeur par défaut
    this._props2 = 50; // Valeur par défaut
  }

  // Ou sur un setter
  @Input()
  public set props2(v: number) {
    this._props2 = v;
  } 
}
```

```html
<example-component [props1]="9" [props2]="5"></example-component>
```

Avec projection de contenu sur un seul emplacement

```ts
@Component({
   selector: 'example-component', standalone: true,
   template: `
      <h3>default slot:</h3>
      <ng-content></ng-content>`
})
export class ExampleComponent {}
```

```html
<example-component>
  <p>hello world</p>
</example-component>
```

Avec projection de contenu multi-slots

```ts
@Component({
   selector: 'example-component', standalone: true,
   template: `
      <h3>default slot:</h3>
      <ng-content></ng-content> 
      <h3>slot 0:</h3>
      <ng-content select="[slot_0]"></ng-content>
      <h3>slot 1:</h3>
      <ng-content select="[slot_1]"></ng-content>
      <h3>slot 2:</h3>
      <ng-content select="[slot_2]"></ng-content>`
})
export class ExampleComponent {}
```

```html
<example-component>
   <p>Hello world</p>
   <p slot_0>Hello slot 0</p>
   <p slot_1>Hello slot 1</p>
   <p slot_2>Hello slot 2</p>
</example-component>
```

**🔝 [back to top](#note-angular-17)**

### Component Cycle de vie

| Methode | But |
|---------------------------|----------------------------------------------|
| `ngOnChanges()`           | Répondez lorsque Angular définit ou réinitialise les propriétés d’entrée liées aux données. La méthode reçoit un `SimpleChanges` objet avec les valeurs de propriété actuelles et précédentes. Appelé avant `ngOnInit()` (si le composant a des entrées liées) et chaque fois qu'une ou plusieurs propriétés d'entrée liées aux données changent. |
| `ngOnInit()` | Initialisez la directive ou le composant après qu'Angular ait d'abord affiché les propriétés liées aux données et défini les propriétés d'entrée de la directive ou du composant. Appelé une fois, après le premier `ngOnChanges()`. `ngOnInit()` est toujours appelé même s'il `ngOnChanges()` ne l'est pas (ce qui est le cas lorsqu'il n'y a pas d'entrées liées au modèle). |
| `ngDoCheck()` | Détectez et agissez en fonction des changements qu'Angular ne peut pas ou ne veut pas détecter par lui-même. Appelé immédiatement après `ngOnChanges()` chaque exécution de détection de changement, et immédiatement après lors `ngOnInit()` de la première exécution. |
| `ngAfterContentInit()` | Répondez après qu'Angular projette du contenu externe dans la vue du composant ou dans la vue dans laquelle se trouve une directive. Appelé une fois après le premier `ngDoCheck()`. |
| `ngAfterContentChecked()` | Répondez après qu'Angular ait vérifié le contenu projeté dans la directive ou le composant. Appelé après `ngAfterContentInit()` et à chaque `ngDoCheck()`. |
| `ngAfterViewInit()` | Répondez après qu'Angular ait initialisé les vues et les vues enfants du composant, ou la vue qui contient la directive. Appelé une fois après le premier `ngAfterContentChecked()`. |
| `ngAfterViewChecked()` | Répondez après qu'Angular ait vérifié les vues et les vues enfants du composant, ou la vue qui contient la directive. Appelé après le `ngAfterViewInit()` et à chaque suivant `ngAfterContentChecked()`. |
| `ngOnDestroy()` | Nettoyage juste avant qu'Angular ne détruise la directive ou le composant. Désabonnez-vous des observables et détachez les gestionnaires d'événements pour éviter les fuites de mémoire. |

**🔝 [back to top](#note-angular-17)**

## Template Bindings

1. Interpolations:
   - Permet d'incorporer des valeurs de variables du composant directement dans le template HTML.
   - Syntaxe: `{{ expression }}`

   ```html
   <p>Hello, {{ username }}!</p>
   <p>7 + 3 = {{ 7 + 3 }}.</p>
   <p>Total count: {{ count }}.</p>
   ```

2. Property Binding :
   - Utilisé pour lier des propriétés DOM standard.
   - Syntaxe: `[property]="expression"`

   ```html
   <!-- Bind la valeur de la propriété 'value' de l'input à la variable 'username' du composant -->
   <input [value]="username">
   ```

3. Attribut Binding :
   - Utilisé pour lier des attributs HTML qui ne sont pas des propriétés DOM standard.
   - Syntaxe: `[attr.attribute]="expression"`

   ```html
   <!-- Définit l'attribut 'aria-label' à la valeur de 'ariaLabel' dans le composant -->
   <div [attr.aria-label]="ariaLabel">Content</div>
   ```

4. Class/Style binding
   - Liaison de classe unique:
     - `[class.sale]="onSale"`
   - Liaison multiclasse:
     - `[class]="my-class-1 my-class-2 my-class-3"`
     - `[class]="{foo: true, bar: false}"`
     - `[class]="['foo', 'bar']"`
   - Liaison à un seul style:
      - `[style.background-color]="expression"`
   - Liaison à plusieurs styles:
     - `[style]="styleExpression"`

5. Event binding
   - Utilisé pour écouter et répondre aux actions des utilisateurs
   - Syntaxe : `(event)="instruction"`

   ```html
   <!-- Déclenchant la fonction 'onSave()' lors d'un clic. -->
   <button (click)="onSave()">Save</button>
   <!-- Déclenche la fonction 'onKeydown()' lorsque la touche Shift est enfoncée -->
   <input (keydown.shift)="onKeydown($event)" />
   <!-- Déclenche la fonction 'onKeydown()' lorsqu'une combinaison spécifique de touches est enfoncée (Shift + Alt + T) -->
   <input (keydown.code.shiftleft.altleft.keyt)="onKeydown($event)" />
   ```

6. Two-way data binding
   - La liaison bidirectionnelle donne aux composants de votre application un moyen de partager des données.
   - Syntaxe : `[(size)]="fontSizePx"`

**🔝 [back to top](#note-angular-17)**

## Template Pipes

Les pipes sont des fonctions simples à utiliser dans les expressions de modèle pour accepter une valeur d'entrée et renvoyer une valeur transformée. Pour appliquer un pipe, utilisez l'opérateur pipe (`|`) dans une expression de template, comme indiqué dans l'exemple de code suivant.

```html
<!-- La valeur de `birthday` passe par l'opérateur pipe (`|`) jusqu'a `DatePipe` dont le nom de pipe est `date`. -->
<p>The hero's birthday is {{ birthday | date }}</p>
<!-- Chaînage de deux pipe ensemble, DatePipe et UpperCasePipe -->
<p>The chained hero's uppercase birthday is {{ birthday | date | uppercase }}</p>
```

> ⚠️ Certains pipe ont des paramètres pour affiner la sortie du pipe. Pour spécifier le paramètre, faites suivre le nom du pipe avec deux points (`:`) et la valeur du paramètre, example: `{{ amount | currency:'EUR' }}`. Certains acceptent plusieurs paramètres, example `{{ amount | currency:'EUR':'Euros '}}`.

Angular fournit des pipe pour les transformations de données typiques

- `DatePipe`: Formate une valeur de date selon les règles locales.
- `UpperCasePipe`: Transforme le texte en majuscules.
- `LowerCasePipe`: Transforme le texte en minuscules.
- `CurrencyPipe`: Transforme un nombre en chaîne monétaire, formatée selon les règles locales.
- `DecimalPipe`: Transforme un nombre en chaîne avec un point décimal, formaté selon les règles locales.
- `PercentPipe`: Transforme un nombre en chaîne de pourcentage, formatée selon les règles locales.
- `AsyncPipe`: Abonnez-vous et désabonnez-vous à une source asynchrone telle qu'un observable.
- `JsonPipe` : affichez une propriété d'objet de composant à l'écran au format JSON pour le débogage.

> Liste complète des pipe intégrés: [angular.io/api/common#pipes](https://angular.io/api/common#pipes)

**🔝 [back to top](#note-angular-17)**

## Template Reference Variable

Les variables de template vous aident à utiliser les données d'une partie d'un template dans une autre partie du template.

Une variable de template peut faire référence aux éléments suivants :

- un élément DOM dans un template
- une directive ou un composant
- un TemplateRef à partir d'un `ng-template`
- un composant Web

```html
<!-- Champ de saisie du numéro de téléphone avec une référence locale (#phone) pour accéder à sa valeur. -->
<input #phone placeholder="Numéro de téléphone" value="045255578"/>
<!-- Bouton déclenchant la function onAlert du component lorsqu'il est cliqué. -->
<button type="button" (click)="onLog(phone.value)">Appeler</button>
```

```ts
class ExampleComponent {
   @ViewChild('phone')
   public inputElement: ElementRef;

   public onLog(value) {
      console.log('from arg', value);
      console.log('from field', this.inputElement.nativeElement.textContent);
   }
}
```

**🔝 [back to top](#note-angular-17)**

## Template Directives

Angular propose un ensemble de directives intégrées que vous pouvez utiliser dans vos templates. Voici une liste de certaines des directives les plus couramment utilisées

**🔝 [back to top](#note-angular-17)**

### Directives: structural directives

Les directives structurelles sont responsables de la mise en page HTML. Ils façonnent ou remodèlent la structure du DOM, généralement en ajoutant, supprimant et manipulant les éléments hôtes auxquels ils sont attachés.

1. **ngIf :** Affiche ou masque un élément du DOM en fonction d'une expression conditionnelle.

   ```html
   <div *ngIf="condition">Contenu conditionnel</div>
   ```

2. **ngIfElse :** Affiche un contenu alternatif lorsque la condition de ngIf n'est pas remplie.

   ```html
   <div *ngIf="condition; else elseBlock">Contenu conditionnel</div>
   <ng-template #elseBlock>Contenu alternatif</ng-template>
   ```

3. **ngFor :** Itère sur une liste d'éléments pour générer des éléments DOM.

   ```html
   <ul>
      <li *ngFor="let item of items">{{ item }}</li>
   </ul>
   ```

4. **ngSwitch :** Effectue des opérations de commutation sur une valeur.

   ```html
   <div [ngSwitch]="value">
      <div *ngSwitchCase="'case1'">Cas 1</div>
      <div *ngSwitchCase="'case2'">Cas 2</div>
      <div *ngSwitchDefault>Défaut</div>
   </div>
   ```

**🔝 [back to top](#note-angular-17)**

### Directives: Attribute directives

Les directives d'attribut écoutent et modifient le comportement d'autres éléments, attributs, propriétés et composants HTML.

1. **ngClass :** Applique des classes CSS conditionnelles à un élément.

   ```html
   <div [ngClass]="{'class1': condition1, 'class2': condition2}">Contenu avec classes conditionnelles</div>
   ```

2. **ngStyle :** Applique des styles CSS conditionnels à un élément.

   ```html
   <div [ngStyle]="{'color': condition ? 'red' : 'blue'}">Texte coloré conditionnellement</div>
   ```

3. **ngModel :** Lie un élément de formulaire à une variable du composant pour permettre la liaison bidirectionnelle des données.

   ```html
   <input [(ngModel)]="variable" />
   ```

**🔝 [back to top](#note-angular-17)**

### Directives: Other

1. **ngSubmit :** Gère l'événement de soumission d'un formulaire.

   ```html
   <form (ngSubmit)="onSubmit()"></form>
   ```

**🔝 [back to top](#note-angular-17)**

## Others

**🔝 [back to top](#note-angular-17)**

### Types Subject

1. **`Subject` :**
   - Ne retient pas de valeur initiale.
   - Diffuse des valeurs à tous les observateurs actuellement abonnés.
   - Ne retient pas la dernière valeur émise.

2. **`BehaviorSubject` :**
   - A une valeur initiale.
   - Diffuse des valeurs à tous les observateurs actuellement abonnés.
   - Retient la dernière valeur émise pour la fournir à tout nouvel observateur.

3. **`ReplaySubject` :**
   - Retient un historique spécifié de valeurs émises.
   - Diffuse ces valeurs à tout nouvel observateur, même celles émises avant l'abonnement.
   - Vous pouvez spécifier la taille maximale de l'historique.

4. **`AsyncSubject` :**
   - Émet uniquement la dernière valeur lors de la complétion de l'observable source.
   - Utile lorsque seule la dernière valeur est importante.

5. **Combinaison de `ReplaySubject` et `AsyncSubject` :**
   - Retient toutes les valeurs émises, mais n'émet la dernière qu'à la complétion.
   - Utile pour conserver l'historique tout en n'émettant qu'une seule valeur à la fin.

----------

Solution pour éviter de copier une array car l'utilisation de l'opérateur de spread ([... ]) pour créer un nouveau tableau peut être coûteuse en termes de performances si le tableau d'origine est très grand. Cela est dû au fait que chaque élément du tableau doit être copié individuellement dans le nouveau tableau.

```ts
// Service
export class MyService {
  _arrayUpdated: BehaviorSubject<number> = new BehaviorSubject(0);
  _obsArrayUpdated: Observable<number> = this._arrayUpdated.asObservable();
  _myArray: string[] = ["a", "b"];

  _arraySubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  _obsArraySubject: Observable<string[]> = this._arraySubject.asObservable();

  someMethod() {
     // utilisation de l'opérateur de spread ([... ]) pour créer un nouveau tableau
     const newArray = [...this._arraySubject.value, "c", "d"];
     this._arraySubject.next(newArray);
 
     // Utilisation d'un BehaviorSubject qui stocke un nombre, lequel est incrémenté à chaque modification de l'array.
     this._myArray.push("c");
     this._arrayUpdated.next(this._arrayUpdated.value + 1);
     this._myArray.push("d");
     this._arrayUpdated.next(this._arrayUpdated.value + 1);
  }
}

// Component
export class ExampleComponent {
   constructor(private myService: MyService) {
       myService._obsArrayUpdated.subscribe(() => console.log(myService._myArray));
       myService._obsArraySubject.subscribe((v) => console.log(v));
   }
}
```

### Ref HTML in Component
