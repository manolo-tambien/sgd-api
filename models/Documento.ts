export interface Documento {
    _id: string,
    nombre: string,
    region: string,
    categoria: string,
    grado: string,
    descripcion: string
    pdf: {
        size: number,
        mimetype: string,
        filename: string,
        path: string
    }
}