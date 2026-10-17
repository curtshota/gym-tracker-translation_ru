const fs = require("fs");
let c = fs.readFileSync("main.js", "utf8");

const replaceList = [
  // Настройки по умолчанию
  [
    "defaultExercises:`Squat\nBench Press\nDeadlift\nOverhead Press\nBarbell Row\nPull-up`",
    "defaultExercises:`Присед\nЖим лёжа\nСтановая тяга\nЖим стоя\nТяга штанги в наклоне\nПодтягивания`",
  ],
  ['defaultWorkoutType:"Strength"', 'defaultWorkoutType:"Силовая"'],
  ['weightUnit:"lb"', 'weightUnit:"kg"'],

  // Вкладки
  ['{id:"workout",label:"Workout"}', '{id:"workout",label:"Тренировка"}'],
  ['{id:"insights",label:"Insights"}', '{id:"insights",label:"Аналитика"}'],
  ['{id:"calendar",label:"Calendar"}', '{id:"calendar",label:"Календарь"}'],
  ['{id:"routines",label:"Routines"}', '{id:"routines",label:"Рутины"}'],
  ['{id:"library",label:"Library"}', '{id:"library",label:"Библиотека"}'],
  ['{id:"history",label:"History"}', '{id:"history",label:"История"}'],

  // Типы подходов
  ['{label:"Working",value:"working"}', '{label:"Рабочий",value:"working"}'],
  ['{label:"Warm-up",value:"warmup"}', '{label:"Разминка",value:"warmup"}'],
  ['{label:"Drop",value:"drop"}', '{label:"Дроп",value:"drop"}'],
  ['{label:"Failure",value:"failure"}', '{label:"Отказ",value:"failure"}'],

  // Уведомления и команды
  ['"Open Gym Tracker"', '"Открыть трекер зала"'],
  ['name:"Open view"', 'name:"Открыть представление"'],
  [
    'name:"Export latest workout to note"',
    'name:"Экспортировать тренировку в заметку"',
  ],
  [
    'name:"Export tracker backup JSON"',
    'name:"Экспортировать резервную копию"',
  ],
  ['name:"Load demo data"', 'name:"Загрузить демо-данные"'],
  ['name:"Clear tracker data"', 'name:"Очистить данные трекера"'],
  [
    '"Add at least one exercise before saving."',
    '"Добавьте хотя бы одно упражнение."',
  ],
  [
    '"Add ruck distance and duration before saving."',
    '"Укажите дистанцию и длительность."',
  ],
  ['"Workout saved."', '"Тренировка сохранена."'],
  ['"Name the routine before saving."', '"Назовите рутину."'],
  [
    '"Add at least one exercise before saving a routine."',
    '"Добавьте упражнение в рутину."',
  ],
  ['"Routine saved."', '"Рутина сохранена."'],
  ['"Name the exercise before saving."', '"Назовите упражнение."'],
  ['"Exercise saved."', '"Упражнение сохранено."'],
  ['"Exercise deleted."', '"Упражнение удалено."'],
  ['"Routine deleted."', '"Рутина удалена."'],
  ['"Workout deleted."', '"Тренировка удалена."'],
  ['"No workouts to export yet."', '"Пока нет тренировок для экспорта."'],
  ["`Exported ${r}`", "`Экспортировано: ${r}`"],
  ['"Could not export the backup file."', '"Не удалось экспортировать копию."'],
  ["`Exported ${a}`", "`Экспортировано: ${a}`"],
  [
    '"Could not export the workout note."',
    '"Не удалось экспортировать заметку."',
  ],
  [
    "`Loaded ${this.data.workouts.length} demo workouts and ${this.data.routines.length} routines.`",
    "`Загружено ${this.data.workouts.length} тренировок и ${this.data.routines.length} рутин.`",
  ],
  ['"Tracker data cleared."', '"Данные очищены."'],
  [
    '"Load demo data?","This will replace current workouts and routines with fake chart-testing data."',
    '"Загрузить демо-данные?","Текущие данные будут заменены фейковыми."',
  ],
  ['"Load demo"', '"Загрузить"'],
  [
    '"Clear tracker data?","This will remove workouts and routines, then restore the default exercise library."',
    '"Очистить данные?","Данные будут удалены, библиотека восстановлена."',
  ],
  ['"Clear"', '"Очистить"'],
  [
    '"Could not create exercise notes."',
    '"Не удалось создать заметки упражнений."',
  ],

  // Интерфейс (заголовки, кнопки)
  ['return"Gym Tracker"', 'return"Трекер зала"'],
  [
    'i.createEl("h2",{text:"Gym Tracker"})',
    'i.createEl("h2",{text:"Трекер зала"})',
  ],
  [
    'i.createEl("p",{text:"Log sets, routines, records, and notes without leaving your vault."})',
    'i.createEl("p",{text:"Записывайте подходы, рутины, рекорды и заметки прямо в хранилище."})',
  ],
  [
    '{text:"New workout",cls:"mod-cta"}',
    '{text:"Новая тренировка",cls:"mod-cta"}',
  ],
  ['{text:"Export latest"}', '{text:"Экспорт последней"}'],
  ['i.createEl("h3",{text:"Workout"})', 'i.createEl("h3",{text:"Тренировка"})'],
  [
    '`Editing ${this.routineDraftName}`:"Draft"',
    '`Редактирование ${this.routineDraftName}`:"Черновик"',
  ],
  ['U(s,"Mode"', 'U(s,"Режим"'],
  [
    '{label:"Strength",value:"strength"},{label:"Ruck",value:"ruck"}',
    '{label:"Силовая",value:"strength"},{label:"Рюкзак",value:"ruck"}',
  ],
  ['T(s,"Date"', 'T(s,"Дата"'],
  ['T(s,"Type"', 'T(s,"Тип"'],
  [
    'o.placeholder="Strength, Push, Legs..."',
    'o.placeholder="Силовая, Жим, Ноги..."',
  ],
  ['T(s,"Minutes"', 'T(s,"Минуты"'],
  ['u.createSpan({text:"Notes"})', 'u.createSpan({text:"Заметки"})'],
  [
    'm.placeholder="Energy, soreness, PRs, form cues..."',
    'm.placeholder="Энергия, забитость, рекорды, техника..."',
  ],
  [
    'p.createEl("h3",{text:"Exercises"})',
    'p.createEl("h3",{text:"Упражнения"})',
  ],
  [
    'p.createEl("button",{text:"Add exercise"})',
    'p.createEl("button",{text:"Добавить упражнение"})',
  ],

  // Рюкзак
  [
    'r.createEl("h3",{text:"Ruck Details"})',
    'r.createEl("h3",{text:"Детали рюкзака"})',
  ],
  [
    'r.createEl("button",{text:"Import GPX",cls:"gym-action-export"})',
    'r.createEl("button",{text:"Импорт GPX",cls:"gym-action-export"})',
  ],
  ['T(s,"Distance"', 'T(s,"Дистанция"'],
  ['U(s,"Distance unit"', 'U(s,"Единица дистанции"'],
  [
    '{label:"Miles",value:"mi"},{label:"Kilometers",value:"km"}',
    '{label:"Мили",value:"mi"},{label:"Километры",value:"km"}',
  ],
  [
    "T(s,`Pack weight (${this.plugin.settings.weightUnit})`",
    "T(s,`Вес рюкзака (${this.plugin.settings.weightUnit})`",
  ],
  ['T(s,"Elevation gain"', 'T(s,"Набор высоты"'],
  ['U(s,"Elevation unit"', 'U(s,"Единица высоты"'],
  [
    '{label:"Feet",value:"ft"},{label:"Meters",value:"m"}',
    '{label:"Футы",value:"ft"},{label:"Метры",value:"m"}',
  ],
  ['p.createSpan({text:"Route"})', 'p.createSpan({text:"Маршрут"})'],
  [
    'h.placeholder="Trail, neighborhood loop, treadmill incline..."',
    'h.placeholder="Тропа, круг по району, наклон на дорожке..."',
  ],
  ['C(g,"Pace","")', 'C(g,"Темп","")'],
  ['C(g,"Load distance","")', 'C(g,"Нагрузочная дистанция","")'],

  // Футер и карточки упражнений
  [
    's.createSpan({text:this.activeWorkout.mode==="ruck"?"Distance":"Volume"})',
    's.createSpan({text:this.activeWorkout.mode==="ruck"?"Дистанция":"Объём"})',
  ],
  [
    '{text:this.routineDraftName?"Update routine":"Save routine"}',
    '{text:this.routineDraftName?"Обновить рутину":"Сохранить рутину"}',
  ],
  [
    '{text:"Save workout",cls:"mod-cta"}',
    '{text:"Сохранить тренировку",cls:"mod-cta"}',
  ],
  ['U(i,"Routine"', 'U(i,"Рутина"'],
  [
    '{label:"Load routine...",value:""}',
    '{label:"Загрузить рутину...",value:""}',
  ],
  [
    '{label:"No routines saved",value:""}',
    '{label:"Нет сохранённых рутин",value:""}',
  ],
  [
    'a.createEl("button",{text:"Load"})',
    'a.createEl("button",{text:"Загрузить"})',
  ],
  ['"Choose a routine to load."', '"Выберите рутину."'],
  [
    '"Load routine?","Your current workout draft will be replaced.",u,"Load"',
    '"Загрузить рутину?","Текущий черновик будет заменён.",u,"Загрузить"',
  ],
  [
    'a.createEl("button",{text:"New routine"})',
    'a.createEl("button",{text:"Новая рутина"})',
  ],
  [
    'a.createEl("button",{text:"Remove",cls:"gym-action-remove"})',
    'a.createEl("button",{text:"Убрать",cls:"gym-action-remove"})',
  ],
  ["`exercise #${i+1}`", "`упражнение #${i+1}`"],
  ['"Remove exercise?"', '"Убрать упражнение?"'],
  [
    "`${g} and its sets will be removed from this draft.`",
    "`${g} и его подходы будут удалены из черновика.`",
  ],
  ['"Remove"', '"Убрать"'],
  ['T(o,"Exercise","text"', 'T(o,"Упражнение","text"'],
  ['T(o,"Exercise notes","text"', 'T(o,"Заметки к упражнению","text"'],
  [
    'u.placeholder="Cues, machine setting, soreness..."',
    'u.placeholder="Техника, настройка тренажёра, забитость..."',
  ],
  [
    'm.createEl("strong",{text:"Sets"})',
    'm.createEl("strong",{text:"Подходы"})',
  ],
  [
    'm.createEl("button",{text:"Add set"})',
    'm.createEl("button",{text:"Добавить подход"})',
  ],
  [
    'a.createEl("span",{text:`Set ${s+1}`',
    'a.createEl("span",{text:`Подход ${s+1}`',
  ],
  ['U(a,"Type"', 'U(a,"Тип"'],
  ['T(a,"Reps"', 'T(a,"Повторы"'],
  [
    "T(a,`Weight (${this.plugin.settings.weightUnit})`",
    "T(a,`Вес (${this.plugin.settings.weightUnit})`",
  ],
  ['p.createSpan({text:"Done"})', 'p.createSpan({text:"Готово"})'],
  ['T(a,"Set notes","text"', 'T(a,"Заметки к подходу","text"'],
  [
    'g.placeholder="RPE, spotter, form..."',
    'g.placeholder="RPE, страховка, техника..."',
  ],
  [
    '{text:"Rest",cls:"gym-compact-button gym-set-rest"}',
    '{text:"Отдых",cls:"gym-compact-button gym-set-rest"}',
  ],
  [
    'f.setAttr("aria-label","Start rest timer")',
    'f.setAttr("aria-label","Запустить таймер отдыха")',
  ],
  [
    'f.setAttr("title","Start rest timer")',
    'f.setAttr("title","Запустить таймер отдыха")',
  ],
  [
    '{text:"Remove",cls:"gym-compact-button gym-set-remove"}',
    '{text:"Убрать",cls:"gym-compact-button gym-set-remove"}',
  ],
  [
    'w.setAttr("aria-label","Remove set")',
    'w.setAttr("aria-label","Убрать подход")',
  ],
  ['w.setAttr("title","Remove set")', 'w.setAttr("title","Убрать подход")'],
  ['"Remove set?"', '"Убрать подход?"'],
  [
    '`Set ${s+1} will be removed from ${r.name||"this exercise"}.`',
    '`Подход ${s+1} будет удалён из ${r.name||"этого упражнения"}.`',
  ],

  // Таймер и статистика
  [
    'i.createEl("h3",{text:"Rest Timer"})',
    'i.createEl("h3",{text:"Таймер отдыха"})',
  ],
  [
    '{text:this.timerRunning?"Running":"Ready"}',
    '{text:this.timerRunning?"Работает":"Готов"}',
  ],
  ['{text:"-15s"}', '{text:"-15с"}'],
  [
    '{text:this.timerRunning?"Pause":"Start",cls:"mod-cta"}',
    '{text:this.timerRunning?"Пауза":"Старт",cls:"mod-cta"}',
  ],
  ['{text:"+15s"}', '{text:"+15с"}'],
  ['{text:"Reset"}', '{text:"Сброс"}'],
  ['"Rest complete."', '"Отдых завершён."'],
  ['{text:"Progress"}', '{text:"Прогресс"}'],
  ['C(a,"Workouts"', 'C(a,"Тренировки"'],
  ['C(a,"This week"', 'C(a,"За неделю"'],
  ['C(a,"Ruck miles"', 'C(a,"Мили с рюкзаком"'],
  ['C(a,"Sets"', 'C(a,"Подходы"'],
  [
    'C(a,"Streak",`${r.streakDays} days`)',
    'C(a,"Серия",`${r.streakDays} дн.`)',
  ],
  ['{text:"Trends"}', '{text:"Динамика"}'],
  [
    'text:"Trends will appear after saved workouts."',
    'text:"Динамика появится после сохранения тренировок."',
  ],

  // Аналитика упражнений и рекорды
  ['{text:"Exercise Progress"}', '{text:"Прогресс упражнения"}'],
  [
    'text:"Exercise progress will appear after saved workouts."',
    'text:"Прогресс появится после сохранения тренировок."',
  ],
  [
    'U(r,"Exercise",this.selectedExerciseName',
    'U(r,"Упражнение",this.selectedExerciseName',
  ],
  [
    "`No saved history for ${this.selectedExerciseName} yet.`",
    "`Пока нет истории для ${this.selectedExerciseName}.`",
  ],
  ['C(p,"Latest"', 'C(p,"Последний"'],
  ['C(p,"Best 1RM"', 'C(p,"Лучший 1ПМ"'],
  ['C(p,"Best volume"', 'C(p,"Лучший объём"'],
  ['C(p,"Suggestion"', 'C(p,"Рекомендация"'],
  [
    "`${g.sets} sets - ${g.volume} ${this.plugin.settings.weightUnit} - best ${g.bestWeight} x ${g.bestReps}`",
    "`${g.sets} подходов - ${g.volume} ${this.plugin.settings.weightUnit} - лучший ${g.bestWeight} x ${g.bestReps}`",
  ],
  ['{text:"Records"}', '{text:"Рекорды"}'],
  [
    'text:"Records will appear after saved workouts."',
    'text:"Рекорды появятся после сохранения тренировок."',
  ],
  ['kind:"Volume PR",unit:"volume"', 'kind:"PR по объёму",unit:"объём"'],
  ['kind:"Est. 1RM PR",unit:"est. 1RM"', 'kind:"PR по 1ПМ",unit:"1ПМ"'],
  ['kind:"Weight PR",unit:"weight"', 'kind:"PR по весу",unit:"вес"'],

  // Календарь
  [
    '{text:"Prev",cls:"gym-compact-button gym-calendar-prev"}',
    '{text:"Назад",cls:"gym-compact-button gym-calendar-prev"}',
  ],
  [
    '{text:"Today",cls:"gym-compact-button gym-calendar-today"}',
    '{text:"Сегодня",cls:"gym-compact-button gym-calendar-today"}',
  ],
  [
    '{text:"Next",cls:"gym-compact-button gym-calendar-next"}',
    '{text:"Вперёд",cls:"gym-compact-button gym-calendar-next"}',
  ],
  [
    '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]',
    '["Пн","Вт","Ср","Чт","Пт","Сб","Вс"]',
  ],
  [
    '{text:r.length===1?"1 workout":`${r.length} workouts`}',
    '{text:r.length===1?"1 тренировка":`${r.length} тренировок`}',
  ],
  [
    '{text:"Add workout",cls:"gym-action-add"}',
    '{text:"Добавить тренировку",cls:"gym-action-add"}',
  ],
  [
    'text:"No workout saved for this day."',
    'text:"На этот день тренировок нет."',
  ],
  ['l.mode==="ruck"?"Ruck":"Strength"', 'l.mode==="ruck"?"Рюкзак":"Силовая"'],
  ['o.mode==="ruck"?"Ruck":"Strength"', 'o.mode==="ruck"?"Рюкзак":"Силовая"'],
  [
    '{text:"Edit",cls:"gym-action-edit"}',
    '{text:"Изменить",cls:"gym-action-edit"}',
  ],
  [
    '{text:"Export",cls:"gym-action-export"}',
    '{text:"Экспорт",cls:"gym-action-export"}',
  ],
  [
    '{text:"Delete",cls:"gym-danger-button gym-action-delete"}',
    '{text:"Удалить",cls:"gym-danger-button gym-action-delete"}',
  ],
  ['"Delete workout?"', '"Удалить тренировку?"'],
  [
    "`${l.date} ${l.type} will be removed.`",
    "`${l.date} ${l.type} будет удалена.`",
  ],
  [
    "`${o.date} ${o.type} will be removed.`",
    "`${o.date} ${o.type} будет удалена.`",
  ],

  // Библиотека
  ['{text:"Exercise Library"}', '{text:"Библиотека упражнений"}'],
  [
    'text:"Add exercises with muscle group and equipment."',
    'text:"Добавьте упражнения с мышцей и снарядом."',
  ],
  ['T(c,"Filter exercises","search"', 'T(c,"Фильтр упражнений","search"'],
  [
    'o.placeholder="Name, muscle, equipment, category..."',
    'o.placeholder="Название, мышца, снаряд, категория..."',
  ],
  [
    "l.setText(`${p.length} of ${a.length}`)",
    "l.setText(`${p.length} из ${a.length}`)",
  ],
  [
    'text:"No exercises match that filter."',
    'text:"Нет упражнений по этому фильтру."',
  ],
  [
    '{text:"Add",cls:"gym-action-add"}',
    '{text:"Добавить",cls:"gym-action-add"}',
  ],
  [
    '{text:"History",cls:"gym-action-export"}',
    '{text:"История",cls:"gym-action-export"}',
  ],
  ['"Delete exercise?"', '"Удалить упражнение?"'],
  [
    "`${h.name} will be removed from the exercise library.`",
    "`${h.name} будет удалено из библиотеки.`",
  ],

  // Рутины
  ['i.createEl("h3",{text:"Routines"})', 'i.createEl("h3",{text:"Рутины"})'],
  [
    'i.createEl("button",{text:"New routine",cls:"gym-action-add"})',
    'i.createEl("button",{text:"Новая рутина",cls:"gym-action-add"})',
  ],
  [
    'text:"Saved routines will show up here. Start a new routine draft to build your first one."',
    'text:"Сохранённые рутины появятся здесь."',
  ],
  [
    "`${o.exercises.length} exercises`,`${bt(o)} sets`",
    "`${o.exercises.length} упражнений`,`${bt(o)} подходов`",
  ],
  [
    '{text:"Start",cls:"gym-action-add"}',
    '{text:"Начать",cls:"gym-action-add"}',
  ],
  [
    '"Edit the routine draft, then choose Update routine."',
    '"Измените черновик рутины и выберите «Обновить рутину»."',
  ],
  ['"Delete routine?"', '"Удалить рутину?"'],
  [
    "`${o.name} will be removed from your routines.`",
    "`${o.name} будет удалена из ваших рутин.`",
  ],

  // История
  [
    'r.createDiv({cls:"gym-section-heading"}).createEl("h3",{text:"History"})',
    'r.createDiv({cls:"gym-section-heading"}).createEl("h3",{text:"История"})',
  ],
  [
    'text:"Your saved workouts will show up here."',
    'text:"Здесь появятся сохранённые тренировки."',
  ],
  ['`${m} PR${m===1?"":"s"}`', "`${m} PR`"],

  // Модалки и настройки
  [
    "`${this.activeWorkout.type||this.plugin.settings.defaultWorkoutType} Routine`",
    "`${this.activeWorkout.type||this.plugin.settings.defaultWorkoutType} Рутина`",
  ],
  [
    '"Build the routine draft, then choose Save routine."',
    '"Соберите черновик рутины и выберите «Сохранить рутину»."',
  ],
  ["`New workout draft for ${e}.`", "`Новый черновик тренировки на ${e}.`"],
  [
    "`Added ${e.name} to current workout.`",
    "`${e.name} добавлено в текущую тренировку.`",
  ],
  [
    '"Could not find track points in that GPX file."',
    '"В этом GPX-файле не найдены точки трека."',
  ],
  [
    "`Imported GPX: ${a.distanceKilometers.toFixed(2)} km.`",
    "`GPX импортирован: ${a.distanceKilometers.toFixed(2)} км.`",
  ],
  ['"Could not import that GPX file."', '"Не удалось импортировать GPX-файл."'],
  [
    'this.activeWorkout.type=this.activeWorkout.type.trim()||"Ruck"',
    'this.activeWorkout.type=this.activeWorkout.type.trim()||"Рюкзак"',
  ],
  ["`No saved history for ${e} yet.`", "`Пока нет истории для ${e}.`"],
  ['s="Delete"', 's="Удалить"'],
  ['setName("Demo data")', 'setName("Демо-данные")'],
  [
    'setDesc("Replace tracker data with fake workouts/routines for chart testing, or reset back to a blank tracker.")',
    'setDesc("Заменить данные фейковыми тренировками для теста или сбросить.")',
  ],
  ['setButtonText("Load demo data")', 'setButtonText("Загрузить демо")'],
  ['setButtonText("Clear data")', 'setButtonText("Очистить данные")'],
  ['setName("Weight unit")', 'setName("Единица веса")'],
  [
    'setDesc("Used for labels and exports.")',
    'setDesc("Используется в подписях и экспорте.")',
  ],
  ['setName("Auto-export workouts")', 'setName("Авто-экспорт тренировок")'],
  [
    'setDesc("Create or update the Markdown workout note after each save.")',
    'setDesc("Создавать заметку после каждого сохранения.")',
  ],
  ['setName("Link exercise notes")', 'setName("Связывать заметки")'],
  [
    'setDesc("Use Obsidian wiki links for exercises in exported workout notes.")',
    'setDesc("Использовать wiki-ссылки.")',
  ],
  ['setName("Create exercise notes")', 'setName("Создавать заметки")'],
  [
    'setDesc("Automatically create missing exercise notes when saving a workout.")',
    'setDesc("Автоматически создавать заметки упражнений.")',
  ],
  ['setName("Default rest timer")', 'setName("Таймер отдыха")'],
  [
    'setDesc("Default rest duration in seconds.")',
    'setDesc("Длительность отдыха в секундах.")',
  ],
  ['setName("Default workout type")', 'setName("Тип тренировки")'],
  [
    'setDesc("Pre-filled when you start a new workout.")',
    'setDesc("Подставляется при создании.")',
  ],
  ['setName("Export folder")', 'setName("Папка экспорта")'],
  [
    'setDesc("Folder where exported workout notes are created.")',
    'setDesc("Папка для заметок.")',
  ],
  ['setName("Exercise folder")', 'setName("Папка упражнений")'],
  [
    'setDesc("Folder where exercise notes are created.")',
    'setDesc("Папка для упражнений.")',
  ],
  ['setName("Default exercises")', 'setName("Упражнения по умолчанию")'],
  [
    'setDesc("One exercise per line. These appear as suggestions in new exercise rows.")',
    'setDesc("Одно упражнение на строку.")',
  ],
  [
    'e.createEl("h2",{text:"Save routine"})',
    'e.createEl("h2",{text:"Сохранить рутину"})',
  ],
  ['new d.Setting(e).setName("Name")', 'new d.Setting(e).setName("Название")'],
  [
    'r.createEl("button",{text:"Cancel"})',
    'r.createEl("button",{text:"Отмена"})',
  ],
  [
    'r.createEl("button",{text:"Save",cls:"mod-cta"})',
    'r.createEl("button",{text:"Сохранить",cls:"mod-cta"})',
  ],
  [
    'e.createEl("h2",{text:"Exercise"})',
    'e.createEl("h2",{text:"Упражнение"})',
  ],
  ['setName("Primary muscle")', 'setName("Основная мышца")'],
  [
    'a.setPlaceholder("Chest, Back, Quads...")',
    'a.setPlaceholder("Грудь, Спина, Квадрицепсы...")',
  ],
  ['setName("Equipment")', 'setName("Снаряд")'],
  [
    'a.setPlaceholder("Barbell, Dumbbell, Machine...")',
    'a.setPlaceholder("Штанга, Гантель, Тренажёр...")',
  ],
  ['setName("Category")', 'setName("Категория")'],
  [
    'a.setPlaceholder("Compound, Isolation, Cardio...")',
    'a.setPlaceholder("Базовое, Изоляция, Кардио...")',
  ],
  ['setName("Notes")', 'setName("Заметки")'],
  ['a="Delete"', 'a="Удалить"'],
  ['this.confirmText==="Delete"', 'this.confirmText==="Удалить"'],
  [
    "n?`${t.length}x`:`${t.length} workouts`",
    "n?`${t.length}x`:`${t.length} тренировок`",
  ],
  ['n?"R":"Ruck"', 'n?"Р":"Рюкзак"'],
  ['n?"S":"Strength"', 'n?"С":"Силовая"'],
  ['let r=e>0?` - ${e} PR${e===1?"":"s"}`:""', 'let r=e>0?` - ${e} PR`:""'],
  [
    "`${t.exercises.length} exercises - ${_(t)} sets - ${V(t)} ${n}${r}`",
    "`${t.exercises.length} упражнений - ${_(t)} подходов - ${V(t)} ${n}${r}`",
  ],
  [
    't===0?"This week":t===1?"Last week":`${t}w ago`',
    't===0?"На этой неделе":t===1?"На прошлой неделе":`${t} нед. назад`',
  ],
  [
    "`Try ${W(e.bestWeight+Mt(n))} ${n}`",
    "`Попробуйте ${W(e.bestWeight+Mt(n))} ${n}`",
  ],
  [
    "`Try ${e.bestWeight} ${n} x ${e.bestReps+1}`",
    "`Попробуйте ${e.bestWeight} ${n} x ${e.bestReps+1}`",
  ],
  ['"Add weight when ready"', '"Добавьте вес, когда будете готовы"'],
  ['{text:"No metadata"', '{text:"Нет метаданных"'],
  [
    "`Duration: ${e.durationMinutes} minutes`",
    "`Длительность: ${e.durationMinutes} мин`",
  ],
  [
    "`Distance: ${e.ruck.distance} ${e.ruck.distanceUnit}`",
    "`Дистанция: ${e.ruck.distance} ${e.ruck.distanceUnit}`",
  ],
  [
    "`Pack weight: ${e.ruck.packWeight} ${this.settings.weightUnit}`",
    "`Вес рюкзака: ${e.ruck.packWeight} ${this.settings.weightUnit}`",
  ],
  [
    "`Pace: ${a} min/${e.ruck.distanceUnit}`",
    "`Темп: ${a} мин/${e.ruck.distanceUnit}`",
  ],
  [
    "`Elevation: ${e.ruck.elevationGain} ${e.ruck.elevationUnit}`",
    "`Набор высоты: ${e.ruck.elevationGain} ${e.ruck.elevationUnit}`",
  ],
  ['`Route: ${e.ruck.route||"-"}`', '`Маршрут: ${e.ruck.route||"-"}`'],
  [
    "`Load distance: ${we(e)} ${this.settings.weightUnit}-${e.ruck.distanceUnit}`",
    "`Нагрузочная дистанция: ${we(e)} ${this.settings.weightUnit}-${e.ruck.distanceUnit}`",
  ],
  ['"","## Notes","",e.notes||"-"', '"","## Заметки","",e.notes||"-"'],
  [
    "`Volume: ${r} ${this.settings.weightUnit}`",
    "`Объём: ${r} ${this.settings.weightUnit}`",
  ],
  ["`Completed sets: ${_(e)}`", "`Выполнено подходов: ${_(e)}`"],
  [
    '"","## Exercises","","| Exercise | Set | Type | Reps | Weight | RPE | RIR | Volume | Done | Notes |"',
    '"","## Упражнения","","| Упражнение | Подход | Тип | Повторы | Вес | RPE | RIR | Объём | Готово | Заметки |"',
  ],
  ['"","## Records",""', '"","## Рекорды",""'],
  ['${l.completed?"yes":"no"}', '${l.completed?"да":"нет"}'],
  [
    '"## Notes","",(r==null?void 0:r.notes)||"-","","## History"',
    '"## Заметки","",(r==null?void 0:r.notes)||"-","","## История"',
  ],

  // Демо-данные
  ['"Lower Strength","Strength"', '"Низ — сила","Силовая"'],
  ['"Upper Push","Strength"', '"Верх — жим","Силовая"'],
  ['"Pull Strength","Strength"', '"Тяга — сила","Силовая"'],
  ['"Neighborhood hills"', '"Соседские холмы"'],
  ['"Park loop"', '"Круг по парку"'],
  ['"Squat","Top sets', '"Присед","Топ-подходы'],
  ['"Romanian Deadlift","Controlled', '"Румынская тяга","Контролируемая'],
  ['"Leg Press","Full depth', '"Жим ногами","Полная амплитуда'],
  ['"Bench Press","Pause', '"Жим лёжа","Пауза'],
  ['"Overhead Press","No layback', '"Жим стоя","Без прогиба'],
  ['"Lateral Raise","Stop before', '"Махи в стороны","Остановись'],
  ['"Deadlift","Reset each rep', '"Становая тяга","Сброс на каждом повторе'],
  ['"Barbell Row","Strict torso', '"Тяга штанги в наклоне","Строгий угол'],
  ['"Pull-up","Full hang', '"Подтягивания","Полный вис'],
  ['"Squat","Belt on top', '"Присед","Пояс на топ-подходах'],
  [
    '"Romanian Deadlift","Hamstrings tight',
    '"Румынская тяга","Бицепс бедра забит',
  ],
  ['"Leg Press","Controlled reps', '"Жим ногами","Контролируемые повторы'],
  ['"Bench Press","Paused first rep', '"Жим лёжа","Пауза на первом'],
  ['"Overhead Press","Kept bar path', '"Жим стоя","Держал траекторию'],
  ['"Seated Cable Row","Squeezed', '"Тяга нижнего блока","Сжимал'],
  ['"Lateral Raise","Slow negatives', '"Махи в стороны","Медленные негативы'],
  ['"Deadlift","Reset every rep', '"Становая тяга","Сброс на каждом'],
  ['"Barbell Row","No body English', '"Тяга штанги в наклоне","Без раскачки'],
  ['"Pull-up","Bodyweight reps', '"Подтягивания","Со своим весом'],
  ['"Barbell Curl","Elbows pinned', '"Подъём штанги на бицепс","Локти прижаты'],
  ['"Demo lower day:', '"Демо-день низа:'],
  ['"Demo upper day:', '"Демо-день верха:'],
  ['"Demo pull day:', '"Демо-день тяги:'],
  ['"Demo ruck:', '"Демо-рюкзак:'],

  // База упражнений
  [
    'name:"Squat",primaryMuscle:"Quads"',
    'name:"Присед",primaryMuscle:"Квадрицепсы"',
  ],
  [
    'name:"Front Squat",primaryMuscle:"Quads"',
    'name:"Фронтальный присед",primaryMuscle:"Квадрицепсы"',
  ],
  [
    'name:"Goblet Squat",primaryMuscle:"Quads"',
    'name:"Гоблет-присед",primaryMuscle:"Квадрицепсы"',
  ],
  [
    'name:"Bulgarian Split Squat",primaryMuscle:"Quads"',
    'name:"Болгарский выпад",primaryMuscle:"Квадрицепсы"',
  ],
  [
    'name:"Walking Lunge",primaryMuscle:"Quads"',
    'name:"Выпад с ходьбой",primaryMuscle:"Квадрицепсы"',
  ],
  [
    'name:"Bench Press",primaryMuscle:"Chest"',
    'name:"Жим лёжа",primaryMuscle:"Грудь"',
  ],
  [
    'name:"Incline Bench Press",primaryMuscle:"Chest"',
    'name:"Жим на наклонной",primaryMuscle:"Грудь"',
  ],
  [
    'name:"Dumbbell Bench Press",primaryMuscle:"Chest"',
    'name:"Жим гантелей лёжа",primaryMuscle:"Грудь"',
  ],
  [
    'name:"Incline Dumbbell Press",primaryMuscle:"Chest"',
    'name:"Жим гантелей на наклонной",primaryMuscle:"Грудь"',
  ],
  [
    'name:"Dumbbell Fly",primaryMuscle:"Chest"',
    'name:"Разведение гантелей",primaryMuscle:"Грудь"',
  ],
  [
    'name:"Deadlift",primaryMuscle:"Posterior chain"',
    'name:"Становая тяга",primaryMuscle:"Задняя цепь"',
  ],
  [
    'name:"Romanian Deadlift",primaryMuscle:"Hamstrings"',
    'name:"Румынская тяга",primaryMuscle:"Бицепс бедра"',
  ],
  [
    'name:"Dumbbell Romanian Deadlift",primaryMuscle:"Hamstrings"',
    'name:"Румынская тяга с гантелями",primaryMuscle:"Бицепс бедра"',
  ],
  [
    'name:"Hip Thrust",primaryMuscle:"Glutes"',
    'name:"Ягодичный мост",primaryMuscle:"Ягодицы"',
  ],
  [
    'name:"Overhead Press",primaryMuscle:"Shoulders"',
    'name:"Жим стоя",primaryMuscle:"Плечи"',
  ],
  [
    'name:"Dumbbell Shoulder Press",primaryMuscle:"Shoulders"',
    'name:"Жим гантелей сидя",primaryMuscle:"Плечи"',
  ],
  [
    'name:"Arnold Press",primaryMuscle:"Shoulders"',
    'name:"Жим Арнольда",primaryMuscle:"Плечи"',
  ],
  [
    'name:"Lateral Raise",primaryMuscle:"Shoulders"',
    'name:"Махи в стороны",primaryMuscle:"Плечи"',
  ],
  [
    'name:"Rear Delt Fly",primaryMuscle:"Rear delts"',
    'name:"Разведение в наклоне",primaryMuscle:"Задняя дельта"',
  ],
  [
    'name:"Barbell Row",primaryMuscle:"Back"',
    'name:"Тяга штанги в наклоне",primaryMuscle:"Спина"',
  ],
  [
    'name:"One-Arm Dumbbell Row",primaryMuscle:"Back"',
    'name:"Тяга гантели одной рукой",primaryMuscle:"Спина"',
  ],
  [
    'name:"Chest-Supported Row",primaryMuscle:"Back"',
    'name:"Тяга с упором в грудь",primaryMuscle:"Спина"',
  ],
  [
    'name:"Barbell Curl",primaryMuscle:"Biceps"',
    'name:"Подъём штанги на бицепс",primaryMuscle:"Бицепс"',
  ],
  [
    'name:"Dumbbell Curl",primaryMuscle:"Biceps"',
    'name:"Подъём гантелей на бицепс",primaryMuscle:"Бицепс"',
  ],
  [
    'name:"Hammer Curl",primaryMuscle:"Biceps"',
    'name:"Молотковые сгибания",primaryMuscle:"Бицепс"',
  ],
  [
    'name:"Skull Crusher",primaryMuscle:"Triceps"',
    'name:"Французский жим",primaryMuscle:"Трицепс"',
  ],
  [
    'name:"Dumbbell Triceps Extension",primaryMuscle:"Triceps"',
    'name:"Разгибание гантели на трицепс",primaryMuscle:"Трицепс"',
  ],
  [
    'name:"Calf Raise",primaryMuscle:"Calves"',
    'name:"Подъём на носки",primaryMuscle:"Икры"',
  ],
  [
    'name:"Leg Press",primaryMuscle:"Quads"',
    'name:"Жим ногами",primaryMuscle:"Квадрицепсы"',
  ],
  [
    'name:"Hack Squat",primaryMuscle:"Quads"',
    'name:"Гакк-присед",primaryMuscle:"Квадрицепсы"',
  ],
  [
    'name:"Leg Extension",primaryMuscle:"Quads"',
    'name:"Разгибание ног",primaryMuscle:"Квадрицепсы"',
  ],
  [
    'name:"Seated Leg Curl",primaryMuscle:"Hamstrings"',
    'name:"Сгибание ног сидя",primaryMuscle:"Бицепс бедра"',
  ],
  [
    'name:"Lying Leg Curl",primaryMuscle:"Hamstrings"',
    'name:"Сгибание ног лёжа",primaryMuscle:"Бицепс бедра"',
  ],
  [
    'name:"Machine Chest Press",primaryMuscle:"Chest"',
    'name:"Жим в тренажёре",primaryMuscle:"Грудь"',
  ],
  [
    'name:"Pec Deck",primaryMuscle:"Chest"',
    'name:"Бабочка",primaryMuscle:"Грудь"',
  ],
  [
    'name:"Lat Pulldown",primaryMuscle:"Back"',
    'name:"Тяга верхнего блока",primaryMuscle:"Спина"',
  ],
  [
    'name:"Seated Cable Row",primaryMuscle:"Back"',
    'name:"Тяга нижнего блока",primaryMuscle:"Спина"',
  ],
  [
    'name:"Machine Row",primaryMuscle:"Back"',
    'name:"Тяга в тренажёре",primaryMuscle:"Спина"',
  ],
  [
    'name:"Machine Shoulder Press",primaryMuscle:"Shoulders"',
    'name:"Жим в тренажёре на плечи",primaryMuscle:"Плечи"',
  ],
  [
    'name:"Cable Lateral Raise",primaryMuscle:"Shoulders"',
    'name:"Махи в стороны на блоке",primaryMuscle:"Плечи"',
  ],
  [
    'name:"Face Pull",primaryMuscle:"Rear delts"',
    'name:"Тяга к лицу",primaryMuscle:"Задняя дельта"',
  ],
  [
    'name:"Cable Curl",primaryMuscle:"Biceps"',
    'name:"Сгибание на бицепс на блоке",primaryMuscle:"Бицепс"',
  ],
  [
    'name:"Triceps Pushdown",primaryMuscle:"Triceps"',
    'name:"Разгибание на трицепс на блоке",primaryMuscle:"Трицепс"',
  ],
  [
    'name:"Cable Crunch",primaryMuscle:"Abs"',
    'name:"Скручивания на блоке",primaryMuscle:"Пресс"',
  ],
  [
    'name:"Assisted Pull-up",primaryMuscle:"Back"',
    'name:"Подтягивания с ассистом",primaryMuscle:"Спина"',
  ],
  [
    'name:"Pull-up",primaryMuscle:"Back"',
    'name:"Подтягивания",primaryMuscle:"Спина"',
  ],
  [
    'name:"Chin-up",primaryMuscle:"Back"',
    'name:"Подтягивания обратным хватом",primaryMuscle:"Спина"',
  ],
  [
    'name:"Push-up",primaryMuscle:"Chest"',
    'name:"Отжимания",primaryMuscle:"Грудь"',
  ],
  [
    'name:"Dip",primaryMuscle:"Triceps"',
    'name:"Отжимания на брусьях",primaryMuscle:"Трицепс"',
  ],
  [
    'name:"Inverted Row",primaryMuscle:"Back"',
    'name:"Австралийские подтягивания",primaryMuscle:"Спина"',
  ],
  [
    'name:"Bodyweight Squat",primaryMuscle:"Quads"',
    'name:"Приседания без веса",primaryMuscle:"Квадрицепсы"',
  ],
  [
    'name:"Glute Bridge",primaryMuscle:"Glutes"',
    'name:"Ягодичный мостик",primaryMuscle:"Ягодицы"',
  ],
  ['name:"Plank",primaryMuscle:"Abs"', 'name:"Планка",primaryMuscle:"Пресс"'],
  [
    'name:"Hanging Leg Raise",primaryMuscle:"Abs"',
    'name:"Подъём ног в висе",primaryMuscle:"Пресс"',
  ],

  // Снаряды и категории
  [
    'equipment:"Barbell",category:"Compound"',
    'equipment:"Штанга",category:"Базовое"',
  ],
  [
    'equipment:"Barbell",category:"Isolation"',
    'equipment:"Штанга",category:"Изоляция"',
  ],
  [
    'equipment:"Dumbbell",category:"Compound"',
    'equipment:"Гантель",category:"Базовое"',
  ],
  [
    'equipment:"Dumbbell",category:"Isolation"',
    'equipment:"Гантель",category:"Изоляция"',
  ],
  [
    'equipment:"Dumbbell",category:"Unilateral"',
    'equipment:"Гантель",category:"Одностороннее"',
  ],
  [
    'equipment:"Machine",category:"Compound"',
    'equipment:"Тренажёр",category:"Базовое"',
  ],
  [
    'equipment:"Machine",category:"Isolation"',
    'equipment:"Тренажёр",category:"Изоляция"',
  ],
  [
    'equipment:"Cable",category:"Compound"',
    'equipment:"Кроссовер",category:"Базовое"',
  ],
  [
    'equipment:"Cable",category:"Isolation"',
    'equipment:"Кроссовер",category:"Изоляция"',
  ],
  ['equipment:"Cable",category:"Core"', 'equipment:"Кроссовер",category:"Кор"'],
  [
    'equipment:"Bodyweight",category:"Compound"',
    'equipment:"Свой вес",category:"Базовое"',
  ],
  [
    'equipment:"Bodyweight",category:"Core"',
    'equipment:"Свой вес",category:"Кор"',
  ],
];

let applied = 0;
for (const [a, b] of replaceList) {
  if (c.includes(a)) {
    c = c.split(a).join(b);
    applied++;
  } else {
    console.warn("НЕ НАЙДЕНО:", a.slice(0, 80));
  }
}

fs.writeFileSync("main-ru.js", c);
console.log(
  `Готово! Применено замен: ${applied} из ${replaceList.length}. Файл: main-ru.js`,
);
