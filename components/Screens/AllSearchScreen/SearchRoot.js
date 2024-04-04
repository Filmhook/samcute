import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import CountryPage from './CountryPage';
import India from './Industry';


import SubScreen from './ProducerSub';
import Director from './DirectorSub';
import Dummy from './ReadyToPage';
import Timeline from './FilmScreen';
import DirectorSubb from './DirectorSubb';
import MakeUpArtistSub from './MakeUpArtistSub';
import CameramanSub from './CameramanSub';
import ActorSub from './ActorSub';
import ArtDeptSub from './ArtDeptSub';
import ActionDeptSubb from './ActionDeptSubb';
import MusicDirSub from './MusicDerSub';
import WriterSub from './WriterSub';
import DubbingSub from './DubbingSub';
import EditorSub from './EditorSub';
import ProductionDeptSub from './ProductionDeptSub';
import ProstheticSub from './ProstheticSub';
import VfxSub from './VfxSub';
import CostumeSub from './CostumeSub';
import AnimatorSub from './AnimatorSub';
import StillPhotographSub from './StillPhotographSub';
import SoundEffectSub from './SoundEffectEnggSub';
import CelebrityManSub from './CelebrityManSub';
import DigitalImagineSub from './DigitalImagineDept';
import MarketingDeptSub from './MarketingDeptSub';
import LightingDeptSub from './LightingDepSub';
import DigitalArtistSub from './DigitalArtistSub';
import ActorAsstSub from './ActorAssistant';
import TechnicianSub from './TechicianSub';
import SpecialEffectSub from './SpecialEffectsSub';
import PublicityDesignerSub from './PublicityDesignerSub';
import CraneOperatorSub from './CraneOpertorSub';
import AccountTeamSub from './AccountTeamSub';
import ChoreographySub from './ChoreographySub';
import DigitalCreatorSub from './DigitalCreatorSub';
import MarketPlace from './MarketPlace';
import RentalProducts from './RentalProducts';
import BuyProducts from './BuyProducts';
import PostProdcuts from './PostProducts';
import CartRental from './CartRental';
import CheckOutBuy from './CheckOutBuy';
import CheckOutRental from './CheckOutRental';
import CartBuy from './cartBuy';
import MarketPalceRoot from './MarketPlaceRoot';

import PakistanSub from './PakistanSub';
import Srilanka from './Srilanka';
import EnglandSub from './EnglandSub';
import PeruSub from './PeruSub';
import NorthAmericaSub from './NorthAmericaSub';
import SierreLeoneSub from './SierreLeoneSub';
import MormonSub from './MormonSub';
import NepalSub from './NepalSub';
import BangladeshSub from './BangladeshSub';
import BhutanSub from './BhutanSub';
import ThailandSub from './ThailandSub';
import AustraliaSub from './AustraliaSub';
import TaiwanSub from './TaiwanSub';
import ChinaSub from './ChinaSub';
import SouthKoreaSub from './SouthKoreaSub';
import RussiaSub from './RussiaSub';
import SomaliaSub from './SomaliaSub';
import KenyaSub from './KenyaSub';
import TanzaniaSub from './TanzaniaSub';
import ZimbabweSub from './ZimbabweSub';
import UgandaSub from './UgandaSub';
import NigeriaSub from './NigeriaSub';
import GhanaSub from './GhanaSub';
import LiberiaSub from './LiberiaSub';
import FranceSub from './FranceSub';
import IndustryScreen from './IndustryScreen';
import IndustryScreenOthers from './IndustryScreenOthers';
import NewsReporter from './NewsReporter';
import ModelingIndustry from './ModelingIndustrySub';

import DetailsScreen from './ShootingLocationSub';
import ShootingLocationPage from './ShootingLocation';


import ShootinglocationPost2 from './ShootinglocationPost2';
// import ShootinglocationPost from './ShootinglocationPost';



const Stack = createNativeStackNavigator();

export default function SearchRoot() {
  return (
 


      <Stack.Navigator initialRouteName="CountryPage" >

        <Stack.Screen component={CountryPage} name="CountryPage"  options={{headerShown:false}}/>
        <Stack.Screen component={India} name="Industry"  options={{headerShown:false}}/>
        {/* //<Stack.Screen component={Tollywood} name="Tollywood"/> */}
        <Stack.Screen component={Dummy} name="ReadyToPage" options={{headerShown:false}} />

        <Stack.Screen component={IndustryScreen} name="ScreenOne" options={{headerShown:false}} />
        <Stack.Screen component={Timeline} name="Home" options={{headerShown:false}} />
        <Stack.Screen component={SubScreen} name="ProducerSub"  options={{headerShown:false}}/>
        <Stack.Screen component={Director} name="Director" options={{headerShown:false}} />
        <Stack.Screen component={DirectorSubb} name="DirectorSubb" options={{headerShown:false}} />
        <Stack.Screen component={MakeUpArtistSub} name="MakeUpArtistSub" options={{headerShown:false}} />
        <Stack.Screen component={CameramanSub} name="CameramanSub" options={{headerShown:false}} />
        <Stack.Screen component={ActorSub} name='ActorSub' options={{headerShown:false}}/>
        <Stack.Screen component={ArtDeptSub} name='ArtDeptSub' options={{headerShown:false}}/>
        <Stack.Screen component={ActionDeptSubb} name='ActionDeptSubb' options={{headerShown:false}}/>
        <Stack.Screen component={MusicDirSub} name='MusicDirSub' options={{headerShown:false}}/>
        <Stack.Screen component={WriterSub} name='WriterSub' options={{headerShown:false}}/>
        <Stack.Screen component={DubbingSub} name='DubbingSub' options={{headerShown:false}}/>
        <Stack.Screen component={EditorSub} name='EditorSub' options={{headerShown:false}}/>
        <Stack.Screen component={ProductionDeptSub} name='ProductionDeptSub' options={{headerShown:false}}/>
        <Stack.Screen component={ProstheticSub} name='ProstheticSub' options={{headerShown:false}}/>
        <Stack.Screen component={VfxSub} name='VfxSub' options={{headerShown:false}}/>
        <Stack.Screen component={CostumeSub} name='CostumeSub' options={{headerShown:false}}/>
        <Stack.Screen component={AnimatorSub} name='AnimatorSub' options={{headerShown:false}}/>
        <Stack.Screen component={StillPhotographSub} name='StillPhotographSub' options={{headerShown:false}}/>
        <Stack.Screen component={SoundEffectSub} name='SoundEffectSub' options={{headerShown:false}}/>
        <Stack.Screen component={CelebrityManSub} name='CelebrityManSub' options={{headerShown:false}}/>
        <Stack.Screen component={DigitalImagineSub} name='DigitalImagineSub' options={{headerShown:false}}/>
        <Stack.Screen component={MarketingDeptSub} name='MarketingDeptSub' options={{headerShown:false}}/>
        <Stack.Screen component={LightingDeptSub} name='LightingDeptSub' options={{headerShown:false}}/>
        <Stack.Screen component={DigitalArtistSub} name='DigitalArtistSub' options={{headerShown:false}}/>
        <Stack.Screen component={ActorAsstSub} name='ActorAsstSub' options={{headerShown:false}}/>
        <Stack.Screen component={TechnicianSub} name='TechnicianSub' options={{headerShown:false}}/>
        <Stack.Screen component={SpecialEffectSub} name='SpecialEffectSub' options={{headerShown:false}}/>
        <Stack.Screen component={PublicityDesignerSub} name='PublicityDesignerSub' options={{headerShown:false}}/>
        <Stack.Screen component={CraneOperatorSub} name='CraneOperatorSub' options={{headerShown:false}}/>
        <Stack.Screen component={AccountTeamSub} name='AccountTeamSub' options={{headerShown:false}}/>
        <Stack.Screen component={ChoreographySub} name='ChoreographySub' options={{headerShown:false}}/>
        <Stack.Screen component={DigitalCreatorSub} name='DigitalCreatorSub' options={{headerShown:false}}/>
        <Stack.Screen component={Srilanka} name='Srilanka' options={{headerShown:false}}/>

        {/* ===================================== */}

        <Stack.Screen name="MarketPlace" component={MarketPlace} options={{headerShown:false}}/>
          <Stack.Screen name="RentalProducts" component={RentalProducts} options={{headerShown:false}}/>
          <Stack.Screen name="BuyProducts" component={BuyProducts} options={{headerShown:false}}/>
          <Stack.Screen name='PostProducts' component={PostProdcuts} options={{headerShown:false}}/>
          <Stack.Screen name='CartRental' component={CartRental} options={{headerShown:false}}/>
          <Stack.Screen name='CheckOutBuy' component={CheckOutBuy} options={{headerShown:false}}/>
          <Stack.Screen name='CheckOutRental' component={CheckOutRental} options={{headerShown:true}}/>
          <Stack.Screen name='CartBuy' component={CartBuy} options={{headerShown:true}}/>

          <Stack.Screen name='IndustryScreenOthers' component={IndustryScreenOthers} options={{headerShown:false}}/>
          <Stack.Screen name='PakistanSub' component={PakistanSub} options={{headerShown:false}}/>
          <Stack.Screen name='EnglandSub' component={EnglandSub} options={{headerShown:false}}/>
          <Stack.Screen name='PeruSub' component={PeruSub} options={{headerShown:false}}/>
          <Stack.Screen name='NorthAmericaSub' component={NorthAmericaSub} options={{headerShown:false}}/>
          <Stack.Screen name='SierreLeoneSub' component={SierreLeoneSub} options={{headerShown:false}}/>
          <Stack.Screen name='MormonSub' component={MormonSub} options={{headerShown:false}}/>
          <Stack.Screen name='NepalSub' component={NepalSub} options={{headerShown:false}}/>
          <Stack.Screen name='BangladeshSub' component={BangladeshSub} options={{headerShown:false}}/>
          <Stack.Screen name='BhutanSub' component={BhutanSub} options={{headerShown:false}}/>
          <Stack.Screen name='ThailandSub' component={ThailandSub} options={{headerShown:false}}/>
          <Stack.Screen name='AustraliaSub' component={AustraliaSub} options={{headerShown:false}}/>
          <Stack.Screen name='TaiwanSub' component={TaiwanSub} options={{headerShown:false}}/>
          <Stack.Screen name='ChinaSub' component={ChinaSub} options={{headerShown:false}}/>
          <Stack.Screen name='SouthKoreaSub' component={SouthKoreaSub} options={{headerShown:false}}/>
          <Stack.Screen name='RussiaSub' component={RussiaSub} options={{headerShown:false}}/>
          <Stack.Screen name='SomaliaSub' component={SomaliaSub} options={{headerShown:false}}/>
          <Stack.Screen name='KenyaSub' component={KenyaSub} options={{headerShown:false}}/>
          <Stack.Screen name='TanzaniaSub' component={TanzaniaSub} options={{headerShown:false}}/>
          <Stack.Screen name='ZimbabweSub' component={ZimbabweSub} options={{headerShown:false}}/>
          <Stack.Screen name='NigeriaSub' component={NigeriaSub} options={{headerShown:false}}/>
          <Stack.Screen name='UgandaSub' component={UgandaSub} options={{headerShown:false}}/>
          <Stack.Screen name='GhanaSub' component={GhanaSub} options={{headerShown:false}}/>
          <Stack.Screen name='LiberiaSub' component={LiberiaSub} options={{headerShown:false}}/>
          <Stack.Screen name='FranceSub' component={FranceSub} options={{headerShown:false}}/>
          <Stack.Screen name='NewsReporter' component={NewsReporter} options={{headerShown:false}}/>
          <Stack.Screen name='ModelingIndustry' component={ModelingIndustry} options={{headerShown:false}}/>

          <Stack.Screen name='ShootingLocationPage' component={ShootingLocationPage} options={{headerShown:false}}/>
          <Stack.Screen name='DetailsScreen' component={DetailsScreen} options={{headerShown:false}}/>

         
          <Stack.Screen name='ShootinglocationPost2' component={ShootinglocationPost2} options={{headerShown:false}}/>

        

     

      </Stack.Navigator>


   
  )
}