json.array!(@breweries) do |brewery|
  json.extract! brewery, :id, :name, :city, :state
  json.url brewery_url(brewery, format: :json)
end
