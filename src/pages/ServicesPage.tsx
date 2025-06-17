import React, { useState, useEffect, useRef } from 'react';
import CosmicBackground from '../components/ui/CosmicBackground';
import { createClient } from '@supabase/supabase-js';

const services = {
  ghostProduction: {
    mainServices: [],
    additionalServices: [
      { name: 'Express Delivery', price: 50 },
      { name: 'Vocal (Royalty Free)', price: 50 },
    ],
  },
  remixTracks: {
    mainServices: [],
    additionalServices: [
      { name: 'Express Delivery', price: 50 },
      { name: 'Instrumental', price: 30 }, // New additional service
    ],
  },
  completeTrack: {
    mainServices: [],
    additionalServices: [
      { name: 'Express Delivery', price: 50 },
    ],
  },
  mixingMastering: {
    mainServices: [],
    additionalServices: [
      { name: 'Express Delivery', price: 50 },
    ],
  },
};

const trackOptions = {
  ghostProduction: [
    { name: '1 Track', price: 200 },
    { name: '3 Tracks', price: 525, singleTrackPrice: (525 / 3).toFixed(2) },
    { name: '5 Tracks', price: 750, singleTrackPrice: (750 / 5).toFixed(2) },
  ],
  remixTracks: [
    { name: '1 Track', price: 170 },
    { name: '3 Tracks', price: 450, singleTrackPrice: (450 / 3).toFixed(2) },
  ],
  completeTrack: [
    { name: '1 Track', price: 150 },
  ],
  mixingMastering: [
    { name: '1 Track', price: 90 },
    { name: '3 Tracks', price: 240, singleTrackPrice: (240 / 3).toFixed(2) },
  ],
};

export const technoGenres = [
  'Acid Techno', 'Afro Techno', 'Ambient Techno', 'Berlin Techno',
  'Detroit Techno', 'Dub Techno', 'Hard Techno', 'Hyper Techno',
  'Hypnotic Techno', 'Industrial Techno', 'Melodic Techno', 'Minimal Techno',
  'Peak-Time Techno', 'Raw Techno', 'Schranz', 'Stroboscopic Techno',
  'Tech House', 'Techno-Dub', 'Tribal Techno', 'UK Techno',
  'Warehouse Techno', 'Wave Techno'
];


const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ghostProduction');
  const [selectedServices, setSelectedServices] = useState<{ name: string; price: number }[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<{ [key: string]: { name: string; price: number; singleTrackPrice?: string } | null }>({
    ghostProduction: null,
    remixTracks: null,
    completeTrack: null,
    mixingMastering: null,
  });
  const [showTrackOptions, setShowTrackOptions] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showGenresDropdown, setShowGenresDropdown] = useState(false);
  const [showOtherGenreInput, setShowOtherGenreInput] = useState(false);
  const [otherGenre, setOtherGenre] = useState('');
  const [audioSrc, setAudioSrc] = useState<string | null>(null); // State to store the audio source
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  const [selectedOptionalServices, setSelectedOptionalServices] = useState<{ [key: string]: { name: string; price: number }[] }>({
    ghostProduction: [],
    remixTracks: [],
    completeTrack: [],
    mixingMastering: [],
  });

  const [weNeedInputs, setWeNeedInputs] = useState<{ [key: string]: { genres: string[]; otherGenre: string; targetingLabel: string; referenceTracks: string } }>({
    ghostProduction: { genres: [], otherGenre: '', targetingLabel: '', referenceTracks: '' },
    remixTracks: { genres: [], otherGenre: '', targetingLabel: '', referenceTracks: '' },
    completeTrack: { genres: [], otherGenre: '', targetingLabel: '', referenceTracks: '' },
    mixingMastering: { genres: [], otherGenre: '', targetingLabel: '', referenceTracks: '' },
  });

  const [referenceLinks, setReferenceLinks] = useState<string[]>(['']); // State to store reference links

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowGenresDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleServiceSelection = (service: { name: string; price: number }) => {
    setSelectedServices((prev) =>
      prev.find((item) => item.name === service.name)
        ? prev.filter((item) => item.name !== service.name)
        : [...prev, service]
    );
  };

  const handleTrackSelection = (track: { name: string; price: number; singleTrackPrice?: string }) => {
    setSelectedTracks((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab]?.name === track.name ? null : track,
    }));
    setShowTrackOptions(false);
  };

  const handleOptionalServiceSelection = (service: { name: string; price: number }) => {
    setSelectedOptionalServices((prev) => {
      const currentServices = prev[activeTab] || [];
      const updatedServices = currentServices.find((item) => item.name === service.name)
        ? currentServices.filter((item) => item.name !== service.name)
        : [...currentServices, service];
      return { ...prev, [activeTab]: updatedServices };
    });
  };

  const handleWeNeedInputChange = (field: string, value: string | string[]) => {
    setWeNeedInputs((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [field]: value },
    }));
  };

  const updateReferenceLinks = (action: 'add' | 'remove', index?: number) => {
    if (action === 'add' && referenceLinks.length < 3) {
      setReferenceLinks([...referenceLinks, '']);
    } else if (action === 'remove' && index !== undefined) {
      const updatedLinks = referenceLinks.filter((_, i) => i !== index);
      setReferenceLinks(updatedLinks);
    }
  };

  const generateEmailBody = () => {
    const emailSections = Object.keys(services).map((tab) => {
      const selectedTrackText = selectedTracks[tab]
        ? `- ${selectedTracks[tab].name}: €${selectedTracks[tab].price}`
        : 'None';

      const selectedOptionalServicesText = selectedOptionalServices[tab]?.map(
        (service) => `- ${service.name}: €${service.price}`
      ).join('\n') || 'None';

      const weNeedDetails = weNeedInputs[tab]
        ? `
      **We Need:**
      - Genres: ${weNeedInputs[tab].genres.length > 0 ? weNeedInputs[tab].genres.join(', ') : 'None'}
      - Other Genre: ${weNeedInputs[tab].otherGenre || 'None'}
      - Targeting Label: ${weNeedInputs[tab].targetingLabel || 'None'}
      - Reference Tracks: ${weNeedInputs[tab].referenceTracks || 'None'}
      `
        : '';

      return `
      **${tab.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}**
      - Selected Track:
      ${selectedTrackText}
      - Additional Services:
      ${selectedOptionalServicesText}
      ${weNeedDetails}
    `;
    });

    const total = calculateTotal();

    return `
    **MY ORDER**

    ${emailSections.join('\n\n')}

    **Total:**
    €${total}

    **Policies:**
    - All sales are final.
    - Revisions are limited to the selected package.
    - Delivery times may vary depending on the complexity of the project.
  `;
  };

  const calculateTotal = () => {
    const servicesTotal = selectedServices.reduce((total, service) => total + service.price, 0);
    const tracksTotal = Object.values(selectedTracks).reduce((total, track) => total + (track?.price || 0), 0);
    return servicesTotal + tracksTotal;
  };

  const generateEmailBodyOld = (currentTab: string) => {
    const currentServices = services[currentTab].additionalServices;
    const selectedServicesText = selectedServices
      .filter((service) => currentServices.some((s) => s.name === service.name))
      .map((service) => `${service.name} (€${service.price})`)
      .join(', ');

    const selectedTrackText = selectedTracks[currentTab]
      ? `${selectedTracks[currentTab].name} (€${selectedTracks[currentTab].price})`
      : 'None';

    const total = calculateTotal();

    // Additional fields for Ghost Production
    const selectedGenresText = selectedGenres.length > 0
      ? selectedGenres.join(', ')
      : 'None';
    const otherGenreText = otherGenre ? `Other Genre: ${otherGenre}` : 'None';
    const targetingLabel = document.getElementById('label')?.value || 'None';
    const referenceTracks = document.getElementById('references')?.value || 'None';
    const yourDirection = document.getElementById('yourDirection')?.value || 'None';

    // Generate email content based on the current tab
    switch (currentTab) {
      case 'ghostProduction':
        return `
          **MY ORDER** (Ghost Production)

          **Selected Services:**
          ${selectedServicesText}

          **Selected Track:**
          ${selectedTrackText}

          **We Need:**
          - **Genre/Vibe of the Track:** ${selectedGenresText}
          ${otherGenreText ? `- ${otherGenreText}` : ''}
          - **Reference Tracks:** Don't forget to upload your Reference Tracks here.
          - **Targeting Label:** ${targetingLabel}

          **Total:**
          €${total}

          **Policies:**
          - All sales are final.
          - Revisions are limited to the selected package.
          - Delivery times may vary depending on the complexity of the project.
        `;

      case 'remixTracks':
        return `
          **MY ORDER** (Remix Tracks)

          **Selected Services:**
          ${selectedServicesText}

          **We Need:**
          - **Original Track:** Don't forget to upload your track here.
          - **Vocal/Acapella (if applicable):** Don't forget to upload your vocal/acapella here.
          - **Genre/Vibe of the Remix:** ${selectedGenresText}
          ${otherGenreText ? `- ${otherGenreText}` : ''}
          - **1-3 Reference Tracks:** Don't forget to upload your Reference Tracks here.

          **Total:**
          €${total}

          **Policies:**
          - All sales are final.
          - Revisions are limited to the selected package.
          - Delivery times may vary depending on the complexity of the project.
        `;

      case 'completeTrack':
        return `
          **MY ORDER** (Complete Track)

          **Selected Services:**
          ${selectedServicesText}

          **We Need:**
          - **Stems -6dB:** Don't forget to upload your stems here.
          - **Pre-Master:** Don't forget to upload your pre-master here.
          - **1-3 Reference Tracks:** Don't forget to upload your Reference Tracks here.
          - **Your Direction:** ${yourDirection || 'None provided'}

          **Total:**
          €${total}

          **Policies:**
          - All sales are final.
          - Revisions are limited to the selected package.
          - Delivery times may vary depending on the complexity of the project.
        `;

      case 'mixingMastering':
        return `
          **MY ORDER** (Mixing & Mastering)

          **Selected Services:**
          ${selectedServicesText}

          **We Need:**
          - **Stems -8dB:** Don't forget to upload your stems here.
          - **Pre-Master (if existing):** Don't forget to upload your pre-master here.
          - **Reference Tracks:** Don't forget to upload your Reference Tracks here.
          - **Extra Notes (if existing):** ${extraNotes || 'None provided'}

          **Total:**
          €${total}

          **Policies:**
          - All sales are final.
          - Revisions are limited to the selected package.
          - Delivery times may vary depending on the complexity of the project.
        `;

      default:
        return '';
    }
  };

  const saveBill = async (billData) => {
    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          client_name: billData.clientDetails.name,
          client_email: billData.clientDetails.email,
          invoice_number: billData.invoiceNumber,
          total_amount: billData.totalAmount,
          due_date: billData.dueDate,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      for (const [serviceType, selectedTrack] of Object.entries(selectedTracks)) {
        if (selectedTrack) {
          const { data: serviceData, error: serviceError } = await supabase
            .from('order_services')
            .insert({
              order_id: orderData.id,
              service_type: serviceType,
              track_option: selectedTrack.name,
              track_price: selectedTrack.price,
            })
            .select()
            .single();

          if (serviceError) throw serviceError;

          const additionalServices = selectedOptionalServices[serviceType] || [];
          if (additionalServices.length > 0) {
            const { error: additionalError } = await supabase
              .from('order_additional_services')
              .insert(
                additionalServices.map((service) => ({
                  order_service_id: serviceData.id,
                  name: service.name,
                  price: service.price,
                }))
              );

            if (additionalError) throw additionalError;
          }

          const { error: detailsError } = await supabase
            .from('order_details')
            .insert({
              order_service_id: serviceData.id,
              genres: weNeedInputs[serviceType]?.genres || [],
              other_genre: weNeedInputs[serviceType]?.otherGenre || '',
              targeting_label: weNeedInputs[serviceType]?.targetingLabel || '',
              reference_tracks: referenceLinks.filter((link) => link),
              stems_details: serviceType === 'completeTrack' ? weNeedInputs[serviceType]?.stemsDetails : '',
              pre_master_details: serviceType === 'completeTrack' ? weNeedInputs[serviceType]?.preMasterDetails : '',
              your_direction: serviceType === 'completeTrack' ? weNeedInputs[serviceType]?.yourDirection : '',
              extra_notes: serviceType === 'mixingMastering' ? weNeedInputs[serviceType]?.extraNotes : '',
            });

          if (detailsError) throw detailsError;
        }
      }

      console.log('Bill saved successfully:', orderData);
      return orderData;
    } catch (error) {
      console.error('Error saving bill:', error);
      throw error;
    }
  };

  const handlePlaceOrder = async () => {
    const billData = {
      invoiceNumber: `INV-${Date.now()}`,
      clientDetails: {
        name: 'Client Name',
        email: 'client@example.com',
      },
      serviceBreakdown: selectedServices.map((service) => ({
        serviceName: service.name,
        description: service.name,
        amount: service.price,
      })),
      totalAmount: calculateTotal(),
      issueDate: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      additionalDetails: {
        genres: weNeedInputs[activeTab]?.genres || [],
        otherGenre: weNeedInputs[activeTab]?.otherGenre || '',
        targetingLabel: weNeedInputs[activeTab]?.targetingLabel || '',
        referenceTracks: referenceLinks.filter((link) => link),
      },
    };

    await saveBill(billData);

    const emailBody = `
    Invoice Number: ${billData.invoiceNumber}
    Client Name: ${billData.clientDetails.name}
    Client Email: ${billData.clientDetails.email}
    Services Rendered:
    ${billData.serviceBreakdown.map((service) => `- ${service.description}: €${service.amount}`).join('\n')}
    Total Amount: €${billData.totalAmount.toFixed(2)}
    Genres: ${billData.additionalDetails.genres.join(', ') || 'None'}
    Other Genre: ${billData.additionalDetails.otherGenre || 'None'}
    Targeting Label: ${billData.additionalDetails.targetingLabel || 'None'}
    Reference Tracks: ${billData.additionalDetails.referenceTracks.join(', ') || 'None'}
    Issue Date: ${billData.issueDate.toLocaleDateString()}
    Due Date: ${billData.dueDate.toLocaleDateString()}
  `;

    const mailtoLink = `mailto:noirghost.noircode@gmail.com?subject=Order%20Details&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="relative min-h-screen">
      <CosmicBackground />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 flex">
          {/* Sidebar for service titles */}
          <div className="w-1/4 p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white mb-4">
              Services
            </h2>
            <ul className="space-y-2">
              {Object.keys(services).map((tab) => (
                <li key={tab}>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 border-2 ${
                      activeTab === tab
                        ? 'border-gray-500 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white'
                        : 'border-transparent text-gray-300 hover:border-gray-500 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-gray-400 hover:to-white'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </button>
                </li>
              ))}
            </ul>

            {/* Bill Summary */}
            <div className="mt-8 p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white mb-4">
                Bill Summary
              </h2>
              {Object.keys(services).map((tab) => (
                <div key={tab} className="mb-4">
                  <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white">
                    {tab.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </h3>
                  <ul className="space-y-2">
                    {selectedTracks[tab] && (
                      <li className="text-gray-300">
                        - {selectedTracks[tab].name}: €{selectedTracks[tab].price}
                      </li>
                    )}
                    {selectedOptionalServices[tab]?.map((service, index) => (
                      <li key={index} className="text-gray-300">
                        - {service.name}: €{service.price}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white">
                  Total:
                </span>
                <span className="text-lg font-bold text-white">
                  €{calculateTotal()}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={handlePlaceOrder}
                className="px-6 py-3 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 font-bold transition-all duration-300 hover:bg-gray-700 hover:text-white"
              >
                Place Order
              </button>
            </div>
          </div>

          {/* Main content for service options and bill summary */}
          <div className="w-3/4 ml-8">
            {/* Service Name */}
            <div className="mb-8">
              {/* Title and Description */}
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white">
                {activeTab.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </h1>
              {activeTab === 'ghostProduction' && (
                <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white mt-2">
                  Create a fully original, release-ready track tailored to your unique sound and style
                </p>
              )}

              {/* Including Section for Ghost Production */}
              {activeTab === 'ghostProduction' && (
                <div className="mt-4">
                  <h2 className="text-white text-lg font-bold">Including:</h2>
                  <ul className="flex space-x-4 mt-2">
                    <li className="flex items-center">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex items-center shadow-md">
                        5 free Revisions 
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd">
                        Mixing & Mastering
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                        Stems
                      </div>
                    </li>
                  </ul>
                  <p className="text-white text-xs mt-2">Additional revision only for €30</p> {/* Added note */}
                </div>
              )}

              {/* Title and Description for Remix Tracks */}
              {activeTab === 'remixTracks' && (
                <p className="text-white text-sm mt-2">
                  Transform your favorite tracks into unique remixes that match your style and vision.
                </p>
              )}

              {/* Including Section for Remix Tracks */}
              {activeTab === 'remixTracks' && (
                <div className="mt-4">
                  <h2 className="text-white text-lg font-bold">Including:</h2>
                  <ul className="flex space-x-4 mt-2">
                    <li className="flex items-center">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadow-md inline-block">
                        5 Revisions
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                        Mixing & Mastering
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                        Stems
                      </div>
                    </li>
                  </ul>
                  <p className="text-white text-xs mt-2">Additional revision only for €30</p> {/* Added note */}
                </div>
              )}

              {/* Title and Description for Complete Track */}
              {activeTab === 'completeTrack' && (
                <p className="text-white text-sm mt-2">
                  Receive a professionally produced track, ready for release, with your choice of additional services.
                </p>
              )}

              {/* Including Section for Complete Track */}
              {activeTab === 'completeTrack' && (
                <div className="mt-4">
                  <h2 className="text-white text-lg font-bold">Including:</h2>
                  <ul className="flex space-x-4 mt-2">
                    <li className="flex items-center">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                        3 Revisions
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                        Mixing & Mastering
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                        Stems
                      </div>
                    </li>
                  </ul>
                  <p className="text-white text-xs mt-2">Additional revision only for €30</p> {/* Added note */}
                </div>
              )}

              {/* Title and Description for Mixing & Mastering */}
              {activeTab === 'mixingMastering' && (
                <p className="text-white text-sm mt-2">
                  Achieve a balanced, professional sound with expert mixing and mastering, ready for any streaming or club environment!
                </p>
              )}

              {/* Including Section for Mixing & Mastering */}
              {activeTab === 'mixingMastering' && (
                <div className="mt-4">
                  <h2 className="text-white text-lg font-bold">Including:</h2>
                  <ul className="flex space-x-4 mt-2">
                    <li className="flex items-center">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                        2 Revisions
                      </div>
                    </li>
                  </ul>
                  <p className="text-white text-xs mt-2">Additional revision only for €30</p> {/* Added note */}
                </div>
              )}
            </div>

            {/* Tracks Number Dropdown */}
            <div className="mb-8">
              <div
                className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 cursor-pointer"
                onClick={() => setShowTrackOptions(!showTrackOptions)}
              >
                <h2 className="text-xl font-bold text-white">Tracks Number</h2>
                <p className="text-gray-400">{selectedTracks[activeTab] ? selectedTracks[activeTab]?.name : 'Select an option'}</p>
              </div>
              {showTrackOptions && (
                <div className="mt-2 bg-gradient-to-br from-black/80 to-gray-800/80 p-4 rounded-lg shadow-lg">
                  {trackOptions[activeTab].map((track, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedTracks[activeTab]?.name === track.name
                          ? 'border-2 border-gray-500 bg-gray-700 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      onClick={() => handleTrackSelection(track)}
                    >
                      {track.name} - €{track.price}
                      {track.singleTrackPrice && (
                        <span className="block text-sm text-gray-400">
                          (€{track.singleTrackPrice} per track)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Services */}
            <div className="mt-8">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white mb-4">
                Additional Services
              </h2>
              <ul className="space-y-4">
                {services[activeTab].additionalServices.map((service, index) => (
                  <li
                    key={index}
                    className={`p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 bg-gradient-to-br from-black/80 to-gray-800/80 ${
                      selectedOptionalServices[activeTab]?.find((item) => item.name === service.name)
                        ? 'border-2 border-gray-500'
                        : 'border-2 border-transparent'
                    }`}
                    onClick={() => handleOptionalServiceSelection(service)}
                  >
                    <div className="flex justify-between">
                      <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white">
                        {service.name}
                      </span>
                      <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white">
                        €{service.price}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* We Need Section */}
            {activeTab === 'ghostProduction' && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-white mb-4">We Need</h2>
                <div className="space-y-4">
                  {/* Genre/Vibe of the Track */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="genre" className="block text-sm font-bold mb-2">
                      Genre/Vibe of the Track
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <div
                        onClick={() => setShowGenresDropdown(!showGenresDropdown)}
                        className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white ${
                          showGenresDropdown ? 'border-2 border-white' : 'border border-gray-600'
                        }`}
                      >
                        <span>
                          {weNeedInputs[activeTab]?.genres.length > 0
                            ? weNeedInputs[activeTab]?.genres.join(', ')
                            : 'Select genres'}
                        </span>
                        <span className="float-right">{showGenresDropdown ? '▲' : '▼'}</span>
                      </div>
                      {showGenresDropdown && (
                        <div className="absolute mt-2 w-full bg-gradient-to-br from-black/80 to-gray-800/80 p-4 rounded-lg shadow-lg border border-gray-600 max-h-60 overflow-y-auto z-50">
                          {technoGenres.map((genre) => (
                            <div
                              key={genre}
                              className="px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 text-gray-300 hover:bg-gray-700 hover:text-white"
                              onClick={() => {
                                const updatedGenres = weNeedInputs[activeTab]?.genres.includes(genre)
                                  ? weNeedInputs[activeTab]?.genres.filter((g) => g !== genre)
                                  : [...(weNeedInputs[activeTab]?.genres || []), genre];
                                handleWeNeedInputChange('genres', updatedGenres);
                              }}
                            >
                              {genre}
                            </div>
                          ))}
                          {/* Other Option */}
                          <div
                            className="px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => {
                              const updatedGenres = weNeedInputs[activeTab]?.genres.includes('Other')
                                ? weNeedInputs[activeTab]?.genres.filter((g) => g !== 'Other')
                                : [...(weNeedInputs[activeTab]?.genres || []), 'Other'];
                              handleWeNeedInputChange('genres', updatedGenres);
                              setShowOtherGenreInput(!weNeedInputs[activeTab]?.genres.includes('Other'));
                            }}
                          >
                            Other
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Other Genre Input */}
                    {showOtherGenreInput && (
                      <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                        <label htmlFor="otherGenre" className="block text-sm font-bold mb-2">
                          Specify Other Genre
                        </label>
                        <input
                          type="text"
                          id="otherGenre"
                          placeholder="Enter the genre"
                          value={weNeedInputs[activeTab]?.otherGenre}
                          onChange={(e) => handleWeNeedInputChange('otherGenre', e.target.value)}
                          className={`w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 ${
                            weNeedInputs[activeTab]?.otherGenre ? 'border-2 border-white' : 'border border-gray-600'
                          }`}
                        />
                      </div>
                    )}
                  </div>

                  {/* Targeting Label */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="label" className="block text-sm font-bold mb-2">
                      Targeting Label (if existing)
                    </label>
                    <input
                      type="text"
                      id="label"
                      placeholder="Enter the targeting label"
                      value={weNeedInputs[activeTab]?.targetingLabel}
                      onChange={(e) => handleWeNeedInputChange('targetingLabel', e.target.value)}
                      className={`w-full p-2 rounded-lg bg-transparent text-gray-300 focus:outline-none focus:ring-2 ${
                        weNeedInputs[activeTab]?.targetingLabel ? 'border-2 border-white' : 'border border-gray-600'
                      }`}
                    />
                  </div>

                  {/* Reference Tracks */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="references" className="block text-sm font-bold mb-2">
                      1 to 3 Reference Tracks
                    </label>
                    {referenceLinks.map((link, index) => (
                      <div key={index} className="relative mb-4 flex items-center">
                        <input
                          type="url"
                          id={`referenceLink-${index}`}
                          placeholder="Enter reference track link"
                          value={link}
                          onChange={(e) => {
                            const updatedLinks = [...referenceLinks];
                            updatedLinks[index] = e.target.value;
                            setReferenceLinks(updatedLinks);
                          }}
                          className={`w-full p-2 rounded-lg bg-transparent text-gray-300 focus:outline-none focus:ring-2 ${
                            link ? 'border-2 border-white' : 'border border-gray-600'
                          }`}
                        />
                        {index > 0 && (
                          <button
                            onClick={() => updateReferenceLinks('remove', index)}
                            className="ml-2 px-2 py-1 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                          >
                            -
                          </button>
                        )}
                      </div>
                    ))}
                    {referenceLinks.length < 3 && (
                      <button
                        onClick={() => updateReferenceLinks('add')}
                        className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                      >
                        + Add Reference Track
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* We Need Section for Remix Tracks */}
            {activeTab === 'remixTracks' && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-white mb-4">We Need</h2>
                <div className="space-y-4">
                  {/* Original Track */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="originalTrack" className="block text-sm font-bold mb-2">
                      Original Track
                    </label>
                    <input
                      type="text"
                      id="originalTrack"
                      placeholder="Enter original track details"
                      className="w-full p-2 rounded-lg bg-transparent text-gray-300 border border-gray-600 focus:outline-none focus:ring-2"
                    />
                  </div>

                  {/* Vocal/Acapella */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="vocalAcapella" className="block text-sm font-bold mb-2">
                      Vocal/Acapella (if applicable)
                    </label>
                    <input
                      type="text"
                      id="vocalAcapella"
                      placeholder="Enter vocal/acapella details"
                      className="w-full p-2 rounded-lg bg-transparent text-gray-300 border border-gray-600 focus:outline-none focus:ring-2"
                    />
                  </div>

                  {/* Genre/Vibe of the Remix */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="remixGenre" className="block text-sm font-bold mb-2">
                      Genre/Vibe of the Remix
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <div
                        onClick={() => setShowGenresDropdown(!showGenresDropdown)}
                        className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white ${
                          showGenresDropdown ? 'border-2 border-white' : 'border border-gray-600'
                        }`}
                      >
                        <span>
                          {weNeedInputs[activeTab]?.genres.length > 0
                            ? weNeedInputs[activeTab]?.genres.join(', ')
                            : 'Select genres'}
                        </span>
                        <span className="float-right">{showGenresDropdown ? '▲' : '▼'}</span>
                      </div>
                      {showGenresDropdown && (
                        <div className="absolute mt-2 w-full bg-gradient-to-br from-black/80 to-gray-800/80 p-4 rounded-lg shadow-lg border border-gray-600 max-h-60 overflow-y-auto z-50">
                          {technoGenres.map((genre) => (
                            <div
                              key={genre}
                              className="px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 text-gray-300 hover:bg-gray-700 hover:text-white"
                              onClick={() => {
                                const updatedGenres = weNeedInputs[activeTab]?.genres.includes(genre)
                                  ? weNeedInputs[activeTab]?.genres.filter((g) => g !== genre)
                                  : [...(weNeedInputs[activeTab]?.genres || []), genre];
                                handleWeNeedInputChange('genres', updatedGenres);
                              }}
                            >
                              {genre}
                            </div>
                          ))}
                          {/* Other Option */}
                          <div
                            className="px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => {
                              const updatedGenres = weNeedInputs[activeTab]?.genres.includes('Other')
                                ? weNeedInputs[activeTab]?.genres.filter((g) => g !== 'Other')
                                : [...(weNeedInputs[activeTab]?.genres || []), 'Other'];
                              handleWeNeedInputChange('genres', updatedGenres);
                              setShowOtherGenreInput(!weNeedInputs[activeTab]?.genres.includes('Other'));
                            }}
                          >
                            Other
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Other Genre Input */}
                    {showOtherGenreInput && (
                      <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                        <label htmlFor="otherGenre" className="block text-sm font-bold mb-2">
                          Specify Other Genre
                        </label>
                        <input
                          type="text"
                          id="otherGenre"
                          placeholder="Enter the genre"
                          value={weNeedInputs[activeTab]?.otherGenre}
                          onChange={(e) => handleWeNeedInputChange('otherGenre', e.target.value)}
                          className={`w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 ${
                            weNeedInputs[activeTab]?.otherGenre ? 'border-2 border-white' : 'border border-gray-600'
                          }`}
                        />
                      </div>
                    )}
                  </div>

                  {/* 1 to 3 Reference Tracks */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="references" className="block text-sm font-bold mb-2">
                      1 to 3 Reference Tracks
                    </label>
                    {referenceLinks.map((link, index) => (
                      <div key={index} className="relative mb-4 flex items-center">
                        <input
                          type="url"
                          id={`referenceLink-${index}`}
                          placeholder="Enter reference track link"
                          value={link}
                          onChange={(e) => {
                            const updatedLinks = [...referenceLinks];
                            updatedLinks[index] = e.target.value;
                            setReferenceLinks(updatedLinks);
                          }}
                          className={`w-full p-2 rounded-lg bg-transparent text-gray-300 focus:outline-none focus:ring-2 ${
                            link ? 'border-2 border-white' : 'border border-gray-600'
                          }`}
                        />
                        {index > 0 && (
                          <button
                            onClick={() => updateReferenceLinks('remove', index)}
                            className="ml-2 px-2 py-1 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                          >
                            -
                          </button>
                        )}
                      </div>
                    ))}
                    {referenceLinks.length < 3 && (
                      <button
                        onClick={() => updateReferenceLinks('add')}
                        className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                      >
                        + Add Reference Track
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* We Need Section for Complete Track */}
            {activeTab === 'completeTrack' && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-white mb-4">We Need</h2>
                <div className="space-y-4">
                  {/* Stems -6dB */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="stems" className="block text-sm font-bold mb-2">
                      Stems -6dB
                    </label>
                    <input
                      type="text"
                      id="stems"
                      placeholder="Enter stems details"
                      className="w-full p-2 rounded-lg bg-transparent text-gray-300 border border-gray-600 focus:outline-none focus:ring-2"
                    />
                  </div>

                  {/* Pre-Master */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="preMaster" className="block text-sm font-bold mb-2">
                      Pre-Master
                    </label>
                    <input
                      type="text"
                      id="preMaster"
                      placeholder="Enter pre-master details"
                      className="w-full p-2 rounded-lg bg-transparent text-gray-300 border border-gray-600 focus:outline-none focus:ring-2"
                    />
                  </div>

                  {/* 1-3 Reference Tracks */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="referenceTracks" className="block text-sm font-bold mb-2">
                      1-3 Reference Tracks
                    </label>
                    {referenceLinks.map((link, index) => (
                      <div key={index} className="relative mb-4 flex items-center">
                        <input
                          type="url"
                          id={`referenceLink-${index}`}
                          placeholder="Enter reference track link"
                          value={link}
                          onChange={(e) => {
                            const updatedLinks = [...referenceLinks];
                            updatedLinks[index] = e.target.value;
                            setReferenceLinks(updatedLinks);
                          }}
                          className={`w-full p-2 rounded-lg bg-transparent text-gray-300 focus:outline-none focus:ring-2 ${
                            link ? 'border-2 border-white' : 'border border-gray-600'
                          }`}
                        />
                        {index > 0 && (
                          <button
                            onClick={() => updateReferenceLinks('remove', index)}
                            className="ml-2 px-2 py-1 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                          >
                            -
                          </button>
                        )}
                      </div>
                    ))}
                    {referenceLinks.length < 3 && (
                      <button
                        onClick={() => updateReferenceLinks('add')}
                        className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                      >
                        + Add Reference Track
                      </button>
                    )}
                  </div>

                  {/* Your Direction */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="yourDirection" className="block text-sm font-bold mb-2">
                      Your Direction
                    </label>
                    <textarea
                      id="yourDirection"
                      placeholder="Provide your direction or vision for the track"
                      value={weNeedInputs[activeTab]?.yourDirection || ''}
                      onChange={(e) => handleWeNeedInputChange('yourDirection', e.target.value)}
                      className={`w-full p-2 rounded-lg bg-transparent text-gray-300 focus:outline-none focus:ring-2 ${
                        weNeedInputs[activeTab]?.yourDirection ? 'border-2 border-white' : 'border border-gray-600'
                      }`}
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* We Need Section for Mixing & Mastering */}
            {activeTab === 'mixingMastering' && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-white mb-4">We Need</h2>
                <div className="space-y-4">
                  {/* Stems -8dB */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="stems" className="block text-sm font-bold mb-2">
                      Stems -8dB
                    </label>
                    <input
                      type="text"
                      id="stems"
                      placeholder="Enter stems details"
                      className="w-full p-2 rounded-lg bg-transparent text-gray-300 border border-gray-600 focus:outline-none focus:ring-2"
                    />
                  </div>

                  {/* Pre-Master (if existing) */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="preMaster" className="block text-sm font-bold mb-2">
                      Pre-Master (if existing)
                    </label>
                    <input
                      type="text"
                      id="preMaster"
                      placeholder="Enter pre-master details"
                      className="w-full p-2 rounded-lg bg-transparent text-gray-300 border border-gray-600 focus:outline-none focus:ring-2"
                    />
                  </div>

                  {/* Reference Tracks */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="referenceTracks" className="block text-sm font-bold mb-2">
                      Reference Tracks
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="referenceTracks"
                        placeholder="Enter reference tracks"
                        className="w-full p-2 rounded-lg bg-transparent text-gray-300 border border-gray-600 focus:outline-none focus:ring-2"
                      />
                    </div>
                  </div>

                  {/* Extra Notes (if existing) */}
                  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
                    <label htmlFor="extraNotes" className="block text-sm font-bold mb-2">
                      Extra Notes (if existing)
                    </label>
                    <textarea
                      id="extraNotes"
                      placeholder="Provide any additional notes or instructions"
                      className="w-full p-2 rounded-lg bg-transparent text-gray-300 border border-gray-600 focus:outline-none focus:ring-2"
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* You Will Receive Section for Ghost Production */}
            {activeTab === 'ghostProduction' && (
              <div className="mt-8">
                <h2 className="text-white text-lg font-bold mb-4">You Will Receive:</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex items-center shadow-md inline-block">
                      Extended mix, radio edit, instrumental
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Mastered & pre-master files
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      WAV & MP3 formats
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Info files (BPM, key, etc.)
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      MIDI files
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from_black/80 to_gray-800/80 text_gray-300 text_sm font-bold flex itemsCenter shadowMd inline-block">
                      Stems
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {/* You Will Receive Section for Remix Tracks */}
            {activeTab === 'remixTracks' && (
              <div className="mt-8">
                <h2 className="text-white text-lg font-bold mb-4">You’ll Receive:</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Extended Mix (full-length version)
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Radio Edit (shorter, radio-friendly version)
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Mastered
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Pre-Master
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Info Files (BPM, key, etc.)
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      MIDI Files
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Stems
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      WAV & MP3 formats
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {/* You Will Receive Section for Complete Track */}
            {activeTab === 'completeTrack' && (
              <div className="mt-8">
                <h2 className="text-white text-lg font-bold mb-4">You’ll Receive:</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Extended Mix - Radio Edit
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Mastered - Pre-Master
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from_black/80 to_gray-800/80 text_gray-300 text_sm font-bold flex itemsCenter shadowMd inline-block">
                      Info Files (BPM - Key, etc.)
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Stems
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      WAV - MP3
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {/* You Will Receive Section for Mixing & Mastering */}
            {activeTab === 'mixingMastering' && (
              <div className="mt-8">
                <h2 className="text-white text-lg font-bold mb-4">You’ll Receive:</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Extended Mix
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Mastered - Pre-Master
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      Info Files (BPM - Key, etc.)
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300 text-sm font-bold flex itemsCenter shadowMd inline-block">
                      WAV - MP3
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;