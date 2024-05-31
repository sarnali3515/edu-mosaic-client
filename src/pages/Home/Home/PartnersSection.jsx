
const partners = [
    {
        name: 'Dhaka University',
        logo: 'https://i.ibb.co/Gnk8H4S/du-logo.png',
        description: 'Offering a range of academic courses.',
    },
    {
        name: 'BRAC University',
        logo: 'https://i.ibb.co/7S4ysrp/brac-logo.png',
        description: 'Offering cutting-edge online education.',
    },
    {
        name: 'Grameenphone',
        logo: 'https://i.ibb.co/Zgq25qF/Grameenphone.png',
        description: 'Providing affordable internet access for students.',
    },
    {
        name: 'BRAC',
        logo: 'https://i.ibb.co/G2PTx3x/BRAC-logo.png',
        description: 'Enhancing education access and quality in rural areas.',
    },
    {
        name: 'Bangladesh Bank',
        logo: 'https://i.ibb.co/t3Wt86z/bd-bank.png',
        description: 'Promoting financial literacy initiatives.',
    },
    {
        name: 'Bangladesh Red Crescent Society',
        logo: 'https://i.ibb.co/Lxtx66w/Red-Crescent-Society-Logo.png',
        description: 'Collaborating for humanitarian education.',
    },
    // Add more partners as needed
];


const PartnersSection = () => {
    return (
        <section className="py-10">
            <div className="max-w-screen-xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-8">Our Partners & Collaborators</h2>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {partners.map((partner, index) => (
                        <div key={index} className="p-2 ">
                            <img src={partner.logo} alt={`${partner.name} logo`} className="h-10 mx-auto mb-3" />
                            <h3 className="text-base font-medium mb-1">{partner.name}</h3>
                            <p className="text-gray-600 text-xs">{partner.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;