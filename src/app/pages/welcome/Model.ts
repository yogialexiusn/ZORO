export class Model
{   
    booking_id: number;
    awb: string;
    client_code: string;
    shipper_name: string;
    area: string;
    rpu_date: number;
    remarks: string;

    constructor(booking_id: number, awb: string, client_code: string, shipper_name: string, area: string, rpu_date : number, remarks:string)
    {
        this.booking_id = booking_id;
        this.awb = awb;
        this.client_code = client_code;
        this.shipper_name = shipper_name;
        this.area = area;
        this.rpu_date = rpu_date;
        this.remarks = remarks;
    }

}

