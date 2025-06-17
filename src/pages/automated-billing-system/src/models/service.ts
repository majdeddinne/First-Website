export interface Service {
    name: string;
    description: string;
    requirements: string[];
    deliverables: string[];
}

export const services: Service[] = [
    {
        name: "Ghost Production",
        description: "A service that provides a complete music production without crediting the producer.",
        requirements: ["Client's brief", "Reference tracks"],
        deliverables: ["Final mixed track", "Stems"]
    },
    {
        name: "Remix",
        description: "A service that involves reworking an existing track to create a new version.",
        requirements: ["Original track", "Client's vision"],
        deliverables: ["Remixed track", "Stems"]
    }
];