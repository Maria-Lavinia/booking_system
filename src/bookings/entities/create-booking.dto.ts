export class BookingDto {
    id?: number;
    name: string;
    numberOfPeople: number;
    date: Date;
    phone: string;
    email: string;
    comment: string;
    approved: string;

    constructor(name: string, numberOfPeople: number, date: Date, phone: string, email: string, comment: string){
        this.name = name
        this.numberOfPeople = numberOfPeople
        this.date = date,
        this.phone = phone,
        this.email = email,
        this.comment = comment,
        this.approved = this.approved

    }

}