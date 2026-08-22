from pydantic import BaseModel


class FarmerDashboard(BaseModel):
    name: str
    village: str
    district: str
    state: str
    main_crop: str
    land_area: str


class WeatherInfo(BaseModel):
    temperature: str
    condition: str


class FeatureCard(BaseModel):
    name: str
    status: str


class DashboardResponse(BaseModel):
    farmer: FarmerDashboard
    weather: WeatherInfo
    features: list[FeatureCard]