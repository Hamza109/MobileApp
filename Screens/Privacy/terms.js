import React, { useEffect } from 'react'
import { View,Text,HStack, Divider, ScrollView } from 'native-base'
import { StyleSheet,TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
const Terms = () => {

const Navigation=useNavigation()
const source={
    html:
    `
    <h2 className="cols__main-title cols__main-title--top container">PLEASE READ THESE TERMS AND CONDITIONS OF USE CAREFULLY BEFORE USING THIS SITE.</h2><br/>
    <p className="p1 container">By using this site, you signify your assent to these Terms and Conditions. If you do not agree to all of these Terms and Conditions, do not use this site!<br/>
Etherium Technologies, the owner and publisher of All-cures.com ("AC") may revise and update these Terms and Conditions at any time. Your continued usage of the all-cures.com website ("AC Site," or the "Site,") will mean you accept those changes.

</p><br/>
<h2 className="cols__main-title cols__main-title--top container">The Site Does Not Provide Medical Advice</h2>
<p className="p1 container">The contents of the All-cures.com Site, such as text, graphics, images, and other materials created by Etherium Technologies or obtained from Etherium Technologies’ licensors, and other materials contained on the All-cures.com Site (collectively, "Content") are for informational purposes only. The Content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on the All-cures.com Site!<br/>
If you think you may have a medical emergency, call your doctor or Emergency immediately. All-cures.com does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Site. Reliance on any information provided by all-cures.com, all-cures.com employees, others appearing on the Site at the invitation of all-cures.com, or other visitors to the Site is solely at your own risk.</p><br/>

<h2 className="cols__main-title cols__main-title--top container">Children's Privacy</h2>
<p className="p1 container">We are committed to protecting the privacy of children. You should be aware that this Site is not intended or designed to attract children under the age of 13. We do not collect personally identifiable information from any person we actually know is a child under the age of 13.</p><br/>

<h2 className="cols__main-title cols__main-title--top container">Use of the Content</h2>
<p className="p1 container">The Content posted on this Site is protected by the copyright laws inIndia and in foreign countries. All-cures.com authorizes you to view or download a single copy of the Content solely for your personal, non-commercial use if you include the copyright notice located at the end of the material, for example: "©2016, All-cures.com. All rights reserved" and other copyright and proprietary rights notices that are contained in the Content. Any special rules for the use of certain software and other items accessible on the All-cures.com Site may be included elsewhere within the Site and are incorporated into these Terms and Conditions by reference.<br/>
Title to the Content remains with All-cures.com or its licensors. Any use of the Content not expressly permitted by these Terms and Conditions is a breach of these Terms and Conditions and may violate copyright, trademark, and other laws. Content and other features are subject to change or termination without notice in the editorial discretion of All-cures.com. All rights not expressly granted herein are reserved to All-cures.com and its licensors.<br/>
If you violate any of these Terms and Conditions, your permission to use the Content automatically terminates and you must immediately destroy any copies you have made of any portion of the Content.</p><br/>
<h2 className="cols__main-title cols__main-title--top container">Liability of All-cures.com and Its Licensors</h2>
<p className="p1 container">The use of the All-cures.com Site and the Content is at your own risk.<br/>
When using the All-cures.com Site, information will be transmitted over a medium that may be beyond the control and jurisdiction of All-cures.com and its suppliers. Accordingly, All-cures.com assumes no liability for or relating to the delay, failure, interruption, or corruption of any data or other information transmitted in connection with use of the All-cures.com Site.<br/>
The All-cures.com Site and the Content are provided on an "as is" basis. All-cures.com, ITS LICENSORS, AND ITS SUPPLIERS, TO THE FULLEST EXTENT PERMITTED BY LAW, DISCLAIM ALL WARRANTIES, EITHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTIES' RIGHTS, AND FITNESS FOR PARTICULAR PURPOSE. Without limiting the foregoing, All-cures.com, its licensors, and its suppliers make no representations or warranties about the following:<br/>
1.	The accuracy, reliability, completeness, currentness, or timeliness of the Content, software, links, or communications provided on or through the use of the All-cures.com Site or All-cures.com.<br/>
2.	The satisfaction of any government regulations requiring disclosure of information on prescription drug products or the approval or compliance of any software tools with regard to the Content contained on the All-cures.com Site.<br/>
In no event shall All-cures.com, its licensors, its suppliers, or any third parties mentioned on the All-cures.com Site be liable for any damages (including, without limitation, incidental and consequential damages, personal injury/wrongful death, lost profits, or damages resulting from lost data or business interruption) resulting from the use of or inability to use the All-cures.com Site or the Content, whether based on warranty, contract, tort, or any other legal theory, and whether or not All-cures.com , its licensors, its suppliers, or any third parties mentioned on the All-cures.com Site are advised of the possibility of such damages. All-cures.com, its licensors, its suppliers, or any third parties mentioned on the All-cures.com Site are not liable for any personal injury, including death, caused by your use or misuse of the Site, Content, or Public Areas (as defined below). </p><br/>

<h2 className="cols__main-title cols__main-title--top container">User Content and Submissions</h2>
<p className="p1 container">The personal information you submit to AllCures-Info.com is governed by the All-cures.com Privacy Policy. To the extent there is an inconsistency between this Agreement and the All-cures.com Privacy Policy, this Agreement shall govern.<br/>
The Site contains functionality and other interactive areas, including blogs, user reviews and comments on information, user reviews on the Physician Directory, etc. (collectively "Public Areas") that allow users to post or upload content and other information, including comments, images, questions, reviews, and other materials (the “User Content”).  Users may also upload User Content via our official brand presence on social media platforms and branded hashtags, including, without limitation Facebook, Twitter, Google Plus, YouTube, Instagram, and Pinterest, (collectively "Social Media Platforms"). You agree that you will not post, upload, or transmit any communications or User Content of any type to the Public Areas or Social Media Platforms that infringe or violate any rights of any party. By submitting communications or User Content to the Public Areas or Social Media Platforms, you agree to comply with these Terms and Conditions and other applicable polices, such as our Reviews Guidelines.  All-cures.com reserves the right to remove User Content for any reason, including User Content that we believe violates these Terms and Conditions or our other policies, such as our Reviews Guidelines. By submitting any communications or User Content to the Public Areas or Social Media Platforms, you further agree that such submission is non-confidential for all purposes. It is important to note that All-cures.com is not responsible for the operation, terms of use or policies of any Social Media Platform. Before using any Social Media Platform you should review its terms of use and policies, including its privacy policy.</p><br/>

<h2 className="cols__main-title cols__main-title--top container">User Submissions — Image, Video, Audio Files</h2>
<p className="p1 container">You agree to only post or upload media (like photos, videos, or audio) on the All-cures.comSite or a Social Media Platform that you have taken yourself or that you have all rights to transmit and license and which do not violate trademark, copyright, privacy, or any other rights of any other person. Photos or videos of celebrities and cartoon or comic images are usually copyrighted by the owner.<br/>
To protect your privacy, you agree that you will not submit any media that contains Personally Identifiable Information (like name, phone number, email address or web site URL) of you or of anyone else. Uploading media like images or video of other people without their permission is strictly prohibited.<br/>
By uploading any media on the All-cures.com Site or a Social Media Platform, you warrant that you have permission from all persons appearing in your media for you to make this contribution and grant rights described herein. Never post a picture or video of or with someone else unless you have their explicit permission.<br/>
It is strictly prohibited to upload media of any kind that contain expressions of hate, abuse, offensive images or conduct, obscenity, pornography, sexually explicit or any material that could give rise to any civil or criminal liability under applicable law or regulations or that otherwise may be in conflict with these Terms and Conditions, or the All-cures.com Privacy Policy.<br/>
You agree that you will not upload any material that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or this Web site.<br/>
By uploading any media on the All-cures.comSite or a Social Media Platform like a photo or video: (a) you grant to All-cures.com a perpetual, irrevocable, non-exclusive, worldwide, royalty-free, fully sublicensable right and license to use, copy, print, publicly display, reproduce, modify, publish, post, transmit, create derivative works from, and distribute the media and any material included in the media; (b) you certify that any person pictured in the submitted media (or, if a minor, his/her parent/legal guardian) authorizes All-cures.com to use, copy, print, publicly display, reproduce, modify, publish, post, transmit, create derivative works from, and distribute the media and any material included in such media; and (c) you agree to indemnify All-cures.com and its affiliates, directors, officers and employees and hold them harmless from any and all claims and expenses, including attorneys' fees, arising from the media and/or your failure to comply with these Terms and Conditions.<br/>
All-cures.com reserves the right to review all media prior to submission to the site and to remove any media for any reason, at any time, without prior notice, at our sole discretion.</p><br/>

<h2 className="cols__main-title cols__main-title--top container">Passwords</h2>
<p className="p1 container">All-cures.com has several tools that allow you to record and store information. You are responsible for taking all reasonable steps to ensure that no unauthorized person shall have access to your All-cures.com passwords or accounts. It is your sole responsibility to: (1) control the dissemination and use of sign-in name, screen name and passwords; (2) authorize, monitor, and control access to and use of your All-cures.com account and password; (3) promptly inform All-cures.com if you believe your account or password has been compromised or if there is any other reason you need to deactivate a password. To send us an email, use the "Contact Us" links located at the bottom of every page of our site. You grant All-cures.com and all other persons or entities involved in the operation of the Site the right to transmit, monitor, retrieve, store, and use your information in connection with the operation of the Site. All-cures.com cannot and does not assume any responsibility or liability for any information you submit, or your or third parties' use or misuse of information transmitted or received using All-cures.com tools and services.</p><br/>
<h2 className="cols__main-title cols__main-title--top container">Advertisements, Searches, and Links to Other Sites</h2>
<p className="p1 container">All-cures.com may provide links to third-party web sites. All-cures.com also may select certain sites as priority responses to search terms you enter and All-cures.com may agree to allow advertisers to respond to certain search terms with advertisements or sponsored content. All-cures.com does not recommend and does not endorse the content on any third-party websites. All-cures.com is not responsible for the content of linked third-party sites, sites framed within the All-cures.com Site, third-party sites provided as search results, or third-party advertisements, and does not make any representations regarding their content or accuracy. Your use of third-party websites is at your own risk and subject to the terms and conditions of use for such sites. All-cures.com does not endorse any product, service, or treatment advertised on the All-cures.com Site. 
</p><br/>
<h2 className="cols__main-title cols__main-title--top container">Jurisdiction</h2>
<p className="p1 container">You expressly agree that exclusive jurisdiction for any dispute with All-cures.com, or in any way relating to your use of the All-cures.com Site, resides in the courts of Jammu (India) and you further agree and expressly consent to the exercise of personal jurisdiction in the courts of Jammu (India) in connection with any such dispute including any claim involving All-cures.com or its affiliates, subsidiaries, employees, contractors, officers, directors, telecommunication providers, and content providers.<br/>
These Terms and Conditions are governed by the internal substantive laws of the Union Territory of J&K, without respect to its conflict of laws principles. If any provision of these Terms and Conditions is found to be invalid by any court having competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of these Terms and Conditions, which shall remain in full force and effect. No waiver of any of these Terms and Conditions shall be deemed a further or continuing waiver of such term or condition or any other term or condition.
</p><br/>
<h2 className="cols__main-title cols__main-title--top container">Complete Agreement</h2>
<p className="p1 container">Except as expressly provided in a particular "legal notice" on the All-cures.com Site, these Terms and Conditions and the All-cures.com Privacy Policy constitute the entire agreement between you and All-cures.com with respect to the use of the All-cures.com Site, and Content.
</p><br/>
<h2 className="cols__main-title cols__main-title--top container">Thank you for your cooperation. We hope you find the All-cures.com Site helpful and convenient to use! </h2>

`
}

  return (
 <View style={{padding:10,backgroundColor:'white',flex:1}}>
    <ScrollView>
    <View style={styles.header}>
<Text style={styles.headerText}>
 Terms and Conditions
</Text>
    </View>
<View style={styles.setting}>
<RenderHTML
contentWidth={wp('100%')}
source={source}
   tagsStyles = {{ adjustsFontSizeToFit:true,

    body:{color:'#00415e'}
 }}

/>
</View>
</ScrollView>
 </View>

  )
}

export default Terms

const styles=StyleSheet.create({
    setting:{
        backgroundColor:'aliceblue',
        borderRadius:15,
        height:'100%',
        width:'100%',
        padding:10,
    },
    item:{
   paddingVertical:17,
   marginRight:20,
   flexDirection:'row',
   justifyContent:'space-between'
    },
    header:{
  padding:15
    },
    headerText:{
        fontFamily:'Raleway-Bold',
   fontSize:wp('5.5%'),
   marginTop:5,
   color:'#00415e'
      
    }
})