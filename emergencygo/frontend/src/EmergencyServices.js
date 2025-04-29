import React from 'react';

function EmergencyServices() {
  const services = [
    {
      id: 1,
      service_name: 'Police Department, Fire Department, Ambulance, Emergencies',
      contact_method: 'Call the number below',
      contact_number: '911',
    },
    {
      id: 2,
      service_name: 'Suicide and Crisis Lifeline',
      contact_method: 'Call the number below for immediate mental health support.',
      contact_number: '988',
    },
    {
      id: 3,
      service_name: 'Poison Control',
      contact_method: 'Call immediately if exposed to poisonous substances.',
      contact_number: '1-800-222-1222',
    },
    {
      id: 4,
      service_name: 'National Domestic Violence Hotline',
      contact_method: '24/7 confidential support for victims of domestic violence.',
      contact_number: '1-800-799-7233',
    },
    {
      id: 5,
      service_name: 'National Sexual Assault Hotline',
      contact_method: 'Confidential support for survivors of sexual assault.',
      contact_number: '1-800-656-4673',
    },
    {
      id: 6,
      service_name: 'National Human Trafficking Hotline',
      contact_method: 'Report human trafficking or seek help.',
      contact_number: '1-888-373-7888',
    },
    {
      id: 7,
      service_name: 'Veterans Crisis Line',
      contact_method: 'Support for veterans in crisis (Press 1 after dialing 988).',
      contact_number: '988',
    },
    {
      id: 8,
      service_name: 'Substance Abuse and Mental Health Services (SAMHSA)',
      contact_method: '24/7 help for mental health and substance use disorders.',
      contact_number: '1-800-662-4357',
    },
    {
      id: 9,
      service_name: 'Roadside Assistance (AAA)',
      contact_method: 'Call if you have a vehicle breakdown (AAA members).',
      contact_number: '1-800-222-4357',
    },
    {
      id: 10,
      service_name: 'Non-Emergencies',
      contact_method: 'Call for supportive services',
      contact_number: '311',
    },
    {
      id: 11,
      service_name: 'EmergencyGo helper agent',
      contact_method: 'Call for an AI agent to help',
      contact_number: '323-814-7213',
    },
  ];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Emergency Services</h1>
      <ul className="space-y-4">
        {services.map(service => (
          <li key={service.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{service.service_name}</h2>
            <p className="text-gray-600 mb-2">{service.contact_method}</p>
            <a href={`tel:${service.contact_number}`} className="text-blue-600 underline">
              📞 {service.contact_number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmergencyServices;