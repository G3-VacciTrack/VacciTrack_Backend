export type EducationResponse = {
    Reference: string;
    cover: string;
    title: string;
    description: string;
    sections: Section[]
}

type Section = {
    title: string;
    vaccines: Vaccines[];
}

type Vaccines = {
    dose: string;
    name: string;
    importance?: string;
}