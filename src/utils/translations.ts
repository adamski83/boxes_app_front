interface TranslationsSchema {
  sidebar: {
    menu: {
      title: string;
      dashboard: string;
      qrScanner: string;
      invoices: string;
      logout: string;
      charts: string;
    };
  };
  form: {
    category: string;
    categories: {
      box: string;
      tape: string;
      foil: string;
      sticker: string;
      filler: string;
      other: string;
    };
    generate: string;
    edit: string;
    searchBoxes: string;
    name: string;
    amount: string;
    dimensions: string;
    usage: string;
    picture: string;
    storage: string;
    add: string;
    validation: {
      nameRequired: string;
      amountRequired: string;
      amountMin: string;
      dimensionsFormat: string;
      usageRequired: string;
    };
  };
  login: {
    title: string;
    name: string;
    email: string;
    password: string;
    submit: string;
    error: string;
  };
  orders: {
    title: string;
    status: {
      warehous: string;
      orders: string;
      clearTasksList: string;
      pending: string;
      inProgress: string;
      completed: string;
    };
  };
  charts: {
    title: string;
  };
}

export const translations: Record<"pl" | "en", TranslationsSchema> = {
  pl: {
    sidebar: {
      menu: {
        title: "Twój Box",
        dashboard: "Panel główny",
        qrScanner: "Skaner QR",
        invoices: "Faktury",
        logout: "Wyloguj",
        charts: "Wykresy",
      },
    },
    form: {
      category: "Kategoria",
      categories: {
        box: "Karton",
        tape: "Taśma",
        foil: "Folia",
        sticker: "Naklejka",
        filler: "Wypełniacz",
        other: "Inne",
      },
      generate: "Generuj PDF",
      edit: "Edytuj",
      searchBoxes: "Szukaj opakowań...",
      name: "Nazwa",
      amount: "Ilość",
      dimensions: "Wymiary",
      usage: "Zastosowanie",
      picture: "Zdjęcie",
      storage: "Magazyn",
      add: "Dodaj",
      validation: {
        nameRequired: "Nazwa jest wymagana",
        amountRequired: "Ilość jest wymagana",
        amountMin: "Minimalna ilość to 1",
        dimensionsFormat: "Format: szerokość,wysokość,głębokość",
        usageRequired: "Zastosowanie jest wymagane",
      },
    },
    login: {
      title: "Logowanie",
      name: "Imię",
      email: "Email",
      password: "Hasło",
      submit: "Zaloguj",
      error: "Nieprawidłowe dane logowania",
    },
    orders: {
      title: "Zamówienia",
      status: {
        warehous: "Magazyn",
        orders: "Zamówienie",
        clearTasksList: "Wyczyść listę zadań",
        pending: "Oczekujące",
        inProgress: "W realizacji",
        completed: "Zakończone",
      },
    },
    charts: {
      title: "Ilość w magazynie",
    },
  },
  en: {
    sidebar: {
      menu: {
        title: "Your Box",
        dashboard: "Dashboard",
        qrScanner: "QR Scanner",
        invoices: "Invoices",
        logout: "Logout",
        charts: "Charts",
      },
    },
    form: {
      category: "Category",
      categories: {
        box: "Box",
        tape: "Tape",
        foil: "Foil",
        sticker: "Sticker",
        filler: "Filler",
        other: "Other",
      },
      generate: "Generate PDF",
      edit: "Edit",
      searchBoxes: "Search boxes...",
      name: "Name",
      amount: "Amount",
      dimensions: "Dimensions",
      usage: "Usage",
      picture: "Picture",
      storage: "Storage",
      add: "Add",
      validation: {
        nameRequired: "Name is required",
        amountRequired: "Amount is required",
        amountMin: "Minimum amount is 1",
        dimensionsFormat: "Format: width,height,depth",
        usageRequired: "Usage is required",
      },
    },
    login: {
      title: "Login",
      name: "Name",
      email: "Email",
      password: "Password",
      submit: "Submit",
      error: "Invalid credentials",
    },
    orders: {
      title: "Orders",
      status: {
        pending: "Pending",
        inProgress: "In Progress",
        completed: "Completed",
        warehous: "Warehouse",
        orders: "Orders",
        clearTasksList: "clear Tasks list",
      },
    },
    charts: {
      title: "Amount in storage",
    },
  },
};
