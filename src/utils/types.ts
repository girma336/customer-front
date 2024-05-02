export {}

export interface IUser {
    name: string
    full_name: string
    email: string
    department: {
        name: string
    }
}

export interface IDepartment {
    name: string
}

export interface IProduct {
    item: {
      id: number
      name: string
      price: number
      users: [IUser]
      department: IDepartment
    }
}

async function App() {
    
}