import React,{useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const FilterSearch = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState('');
  const [propertyType, setPropertyType] = useState(null);

  const [showFilters, setShowFilters] = useState(false);
  const [bedroomCount, setBedroomCount] = useState(2);
  const [bathroomCount, setBathroomCount] = useState(2);
  const [kitchenCount, setKitchenCount] = useState(2);
  const [livingRoomChecked, setLivingRoomChecked] = useState(false);
  const [swimmingPoolChecked, setSwimmingPoolChecked] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [floorSpace, setFloorSpace] = useState([600, 5256]);

   // Add a useEffect hook to hide filters on small screens
   useEffect(() => {
    const handleResize = () => {
      setShowFilters(window.innerWidth >= 768); // Adjust the screen size breakpoint if needed
    };

    handleResize(); // Call it initially to set the correct value

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

 
  const handleFloorSpaceChange = (value) => {
    setFloorSpace(value);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleBedroomCountChange = (value) => {
    setBedroomCount(value);
  };

  const handleBathroomCountChange = (value) => {
    setBathroomCount(value);
  };

  const handleKitchenCountChange = (value) => {
    setKitchenCount(value);
  };

  const handleLivingRoomChange = () => {
    setLivingRoomChecked(!livingRoomChecked);
  };

  const handleSwimmingPoolChange = () => {
    setSwimmingPoolChecked(!swimmingPoolChecked);
  };

  const options = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' },
    // Add more options as needed
  ];

  const handleKeywordChange = (selectedOption) => {
    setKeyword(selectedOption);
  };

  const handleSearch = () => {
    // Perform search based on selected keyword and property type
    // For example, navigate to search results page with query params
    const queryParams = {
      keyword: keyword?.value || '',
      type: propertyType?.value || '',
    };
    router.push({
      pathname: '/search',
      query: queryParams,
    });
  };

  return (
    <div className="ml-4 mr-4">
    <div className="bg-white border rounded-sm shadow-lg mb-7">
      <div className="px-6 py-4 border-b">
        <h3 className="flex text-lg text-red-400 uppercase font-heading">
          <span>Filter Section</span>
          <button
            className="ml-auto text-sm text-gray-600 lg:hidden"
            onClick={handleToggleFilters}
          >
            {showFilters ? 'Hide' : 'Show'}
          </button>
        </h3>
      </div>
      <div className={`px-6 py-10 space-y-10 ${showFilters ? '' : 'hidden'}`}>
<div>
          <h3 className="uppercase font-heading">Property Type</h3>
          <Select
            options={options}
            value={propertyType}
            onChange={setPropertyType}
            className="mt-4"
          />
        </div>
        <div>
          <h3 className="uppercase font-heading">Keyword</h3>
          <div className="mt-4">
            <Select
              options={options}
              value={keyword}
              onChange={handleKeywordChange}
            />
          </div>
        </div>

         <div>
            <h3 className="uppercase font-heading">Price Range</h3>
            <div className="mt-5">
              <Slider
                min={0}
                max={10000}
                value={priceRange}
                onChange={handlePriceRangeChange}
                railStyle={{ backgroundColor: '#E5E7EB' }}
                trackStyle={[{ backgroundColor: '#F87171' }]}
                handleStyle={[
                  { backgroundColor: '#F87171', borderColor: '#F87171' },
                  { backgroundColor: '#F87171', borderColor: '#F87171' },
                ]}
              />
            </div>
          </div> 

          <div>
            <h3 className="uppercase font-heading">Floor Space</h3>
            <div className="mt-5">
              <Slider
                min={0}
                max={10000}
                value={floorSpace}
                onChange={handleFloorSpaceChange}
                railStyle={{ backgroundColor: '#E5E7EB' }}
                trackStyle={[{ backgroundColor: '#F87171' }]}
                handleStyle={[
                  { backgroundColor: '#F87171', borderColor: '#F87171' },
                  { backgroundColor: '#F87171', borderColor: '#F87171' },
                ]}
              />
            </div>
          </div>
        
        <div>
          <h3 className="uppercase font-heading">Facilities</h3>
          <table className="w-full mt-4">
            <tbody>
              <tr>
                <td className="py-2 text-gray-500">Bedroom</td>
                <td className="py-2 space-x-5 font-medium text-right text-gray-500">
                  <button
                    className="focus:outline-none"
                    onClick={() => handleBedroomCountChange(bedroomCount - 1)}
                  >
                    -
                  </button>
                  <span className="text-black">{bedroomCount}</span>
                  <button
                    className="focus:outline-none"
                    onClick={() => handleBedroomCountChange(bedroomCount + 1)}
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Bathroom</td>
                <td className="py-2 space-x-5 font-medium text-right text-gray-500">
                  <button
                    className="focus:outline-none"
                    onClick={() => handleBathroomCountChange(bathroomCount - 1)}
                  >
                    -
                  </button>
                  <span className="text-black">{bathroomCount}</span>
                  <button
                    className="focus:outline-none"
                    onClick={() => handleBathroomCountChange(bathroomCount + 1)}
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Kitchen</td>
                <td className="py-2 space-x-5 font-medium text-right text-gray-500">
                  <button
                    className="focus:outline-none"
                    onClick={() => handleKitchenCountChange(kitchenCount - 1)}
                  >
                    -
                  </button>
                  <span className="text-black">{kitchenCount}</span>
                  <button
                    className="focus:outline-none"
                    onClick={() => handleKitchenCountChange(kitchenCount + 1)}
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Living Room</td>
                <td className="py-2 text-right">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-red-600 border-gray-300 rounded shadow-sm focus:border-red-300 focus:ring focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50"
                    checked={livingRoomChecked}
                    onChange={handleLivingRoomChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Swimming Pool</td>
                <td className="py-2 text-right">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-red-600 border-gray-300 rounded shadow-sm focus:border-red-300 focus:ring focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50"
                    checked={swimmingPoolChecked}
                    onChange={handleSwimmingPoolChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center flex-1 py-7">
          <button
            className="py-3 font-medium text-white rounded-full bg-[#095668] px-7 focus:outline-none"
            onClick={handleSearch}
          >
            Search Now
          </button>
        </div>
      </div>
    </div>
  </div>

  );
};

export default FilterSearch;
