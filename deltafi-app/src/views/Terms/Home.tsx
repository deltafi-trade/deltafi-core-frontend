import { Theme, makeStyles, Typography, Box } from "@material-ui/core";
import Page from "components/layout/Page";

const useStyles = makeStyles(({ breakpoints, mixins, palette, spacing }: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "calc(100vh - 82px)",
    paddingTop: mixins.toolbar.minHeight,
    position: "relative",
    backgroundColor: palette.background.tertiary,
  },
  content: {
    padding: 50,
    maxWidth: 1300,
    [breakpoints.down("md")]: {
      maxWidth: 900,
    },
    [breakpoints.down("sm")]: {
      maxWidth: 600,
    },
  },
  title: {
    fontWeight: 600,
    fontSize: 30,
  },
  header: {
    fontSize: 25,
    paddingBottom: 30,
    color: "#1AFA9A",
  },
  secondary: {
    fontWeight: 400,
    fontSize: 20,
    paddingBottom: 10,
  },
  description: {
    fontSize: 17,
    paddingBottom: 25,
  },
  text: {
    fontSize: 17,
    color: palette.text.secondary,
    paddingBottom: 25,
  },
}));

const Home: React.FC = (props) => {
  const classes = useStyles(props);

  return (
    <Page className={classes.root}>
      <Box className={classes.content}>
        <Typography variant="h1" align="left" paragraph className={classes.title}>
          DELTAFI TERMS OF USER AGREEMENT
        </Typography>
        <Typography variant="h1" align="left" paragraph className={classes.secondary}>
          Last Updated: Feb 01, 2022
        </Typography>
        <Typography variant="h6" align="left" className={classes.description}>
          PLEASE READ THIS TERMS OF USE AGREEMENT (“TERMS OF USE”) CAREFULLY. THESE TERMS OF USE
          GOVERN THE USE OF THE WEBSITE-HOSTED USER INTERFACE (“INTERFACE”) PROVIDED BY DELTAFI
          CORPORATION (“DELTAFI”) AND APPLY TO ALL USERS ACCESSING THE INTERFACE. THE INTERFACE IS
          AN AUTOMATED MARKET MAKER BUILT ON THE SOLANA BLOCKCHAIN (“PROTOCOL”) AND IS GOVERNED BY
          AND BELONGS TO A DECENTRALIZED AUTONOMOUS ORGANIZATION GOVERNANCE MECHANISM. THE INTERFACE
          IS ONE, BUT NOT THE EXCLUSIVE, METHOD BY WHICH USERS CAN ACCESS THE PROTOCOL. BY ACCESSING
          OR USING THE INTERFACE IN ANY WAY, INCLUDING ACCESSING OR USING ANY OF THE SERVICES,
          CONTENT, OR RESOURCES AVAILABLE OR ENABLED VIA THE INTERFACE (EACH A “SERVICE” AND
          COLLECTIVELY, THE “SERVICES”), BY CLICKING ON THE “I ACCEPT” BUTTON, COMPLETING THE
          REGISTRATION PROCESS, OR OTHERWISE ACCESSING OR USING THE INTERFACE OR ANY OF THE
          SERVICES, YOU REPRESENT THAT (1) YOU HAVE READ, UNDERSTAND, AND AGREE TO BE BOUND BY THESE
          TERMS OF USE, (2) YOU ARE OF LEGAL AGE TO FORM A BINDING CONTRACT WITH DELTAFI, (3) YOU
          HAVE THE AUTHORITY TO ENTER INTO THESE TERMS OF USE PERSONALLY OR ON BEHALF OF THE ENTITY
          YOU HAVE NAMED AS THE USER THROUGH THE REGISTRATION PROCESS, AND TO BIND THAT ENTITY TO
          THESE TERMS OF USE, (4) YOU ARE NOT A CITIZEN OR RESIDENT OF, OR ORGANIZED OR LOCATED IN,
          ANY COUNTRY THAT IS THE SUBJECT OF COMPREHENSIVE COUNTRY-WIDE, TERRITORY-WIDE, OR REGIONAL
          ECONOMIC SANCTIONS BY THE UNITED STATES, AND (4) YOU ARE NOT DESIGNATED ON ANY LIST OF
          PROHIBITED OR RESTRICTED PARTIES (INCLUDING BUT NOT LIMITED TO THE “SPECIALLY DESIGNATED
          NATIONAL” LIST MAINTAINED BY THE OFFICE OF FOREIGN ASSETS CONTROL (“OFAC”) OF THE U.S.
          DEPARTMENT OF THE TREASURY OR DENIED PERSONS LIST MAINTAINED BY THE U.S. DEPARTMENT OF
          COMMERCE). THE TERM “YOU” REFERS TO THE INDIVIDUAL OR LEGAL ENTITY, AS APPLICABLE,
          ACCESSING OR USING THE INTERFACE OR ANY OF THE SERVICES. IF YOU DO NOT AGREE TO BE BOUND
          BY THESE TERMS OF USE, YOU MAY NOT ACCESS OR USE THE INTERFACE OR ANY OF THE SERVICES. YOU
          FURTHER REPRESENT THAT YOUR ACCESS AND USE OF THE INTERFACE AND SERVICES WILL FULLY COMPLY
          WITH ALL APPLICABLE LAWS AND REGULATIONS, AND THAT YOU WILL NOT ACCESS OR USE THE
          INTERFACE OR ANY OF THE SERVICES TO CONDUCT, PROMOTE, OR OTHERWISE FACILITATE ANY ILLEGAL
          ACTIVITY.
          <br />
          <br />
          SECTION 13 (DISPUTE RESOLUTION) OF THESE TERMS OF USE IS AN ARBITRATION CLAUSE THAT
          REQUIRES MOST DISPUTES BETWEEN US TO BE RESOLVED ON AN INDIVIDUAL, NON-CLASS ACTION BASIS
          THROUGH BINDING AND FINAL ARBITRATION INSTEAD OF IN COURT. SEE SECTION 13 FOR MORE
          INFORMATION REGARDING THIS ARBITRATION CLAUSE, AND HOW TO OPT OUT.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          Your use of, and participation in, certain Services may be subject to additional terms
          <text style={{ fontWeight: "bold", color: "white" }}> (“Supplemental Terms”) </text>
          and such Supplemental Terms will either be notified to you in the Interface or presented
          to you for your acceptance when you sign up to use the supplemental Service. If these
          Terms of Use are inconsistent with the Supplemental Terms, the Supplemental Terms shall
          control with respect to such Service. These Terms of Use and any applicable Supplemental
          Terms are referred to herein as the
          <text style={{ fontWeight: "bold", color: "white" }}> “Agreement.” </text>
        </Typography>
        <Typography variant="h6" align="left" className={classes.description}>
          PLEASE NOTE THAT THE AGREEMENT IS SUBJECT TO CHANGE BY DELTAFI IN ITS SOLE DISCRETION AT
          ANY TIME. WHEN CHANGES ARE MADE, DELTAFI WILL MAKE A COPY OF THE UPDATED AGREEMENT
          AVAILABLE ON THE INTERFACE AND UPDATE THE “EFFECTIVE DATE” AT THE TOP OF THESE TERMS OF
          USE. IF DELTAFI MAKES ANY MATERIAL CHANGES TO THE AGREEMENT, WE WILL PROVIDE NOTICE OF
          SUCH MATERIAL CHANGES ON THE INTERFACE AND ATTEMPT TO NOTIFY YOU BY SENDING AN E-MAIL TO
          THE E-MAIL ADDRESS PROVIDED IN YOUR ACCOUNT REGISTRATION. ANY CHANGES TO THE AGREEMENT
          WILL BE EFFECTIVE IMMEDIATELY FOR NEW USERS OF THE INTERFACE AND SERVICES, AND WILL BE
          EFFECTIVE FOR EXISTING REGISTERED USERS UPON THE EARLIER OF (A) THIRTY (30) DAYS AFTER THE
          “EFFECTIVE DATE” AT THE TOP OF THESE TERMS OF USE, OR (B) YOUR CONSENT TO AND ACCEPTANCE
          OF THE UPDATED AGREEMENT IF DELTAFI PROVIDES A MECHANISM FOR YOUR IMMEDIATE ACCEPTANCE IN
          A SPECIFIED MANNER (SUCH AS A CLICK-THROUGH ACCEPTANCE), WHICH DELTAFI MAY REQUIRE BEFORE
          FURTHER USE OF THE INTERFACE OR SERVICES IS PERMITTED. IF YOU DO NOT AGREE TO THE UPDATED
          AGREEMENT, YOU MUST STOP USING THE INTERFACE AND ALL SERVICES UPON THE EFFECTIVE DATE OF
          THE UPDATED AGREEMENT. OTHERWISE, YOUR CONTINUED USE OF THE INTERFACE OR ANY OF THE
          SERVICES AFTER THE EFFECTIVE DATE OF THE UPDATED AGREEMENT CONSTITUTES YOUR ACCEPTANCE OF
          THE UPDATED AGREEMENT. YOU AGREE THAT DELTAFI’S CONTINUED PROVISION OF THE INTERFACE AND
          SERVICES IS ADEQUATE CONSIDERATION FOR THE CHANGES IN THE UPDATED AGREEMENT. PLEASE
          REGULARLY CHECK THE INTERFACE TO VIEW THE THEN-CURRENT AGREEMENT.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          1. USE OF THE SERVICES.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          1.1. DeltaFi Properties.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          The Interface, the Services, and the information and content available on the Interface
          and the Services, including the Software (each, a
          <text style={{ fontWeight: "bold", color: "white" }}> “DeltaFi Property” </text>
          and collectively, the
          <text style={{ fontWeight: "bold", color: "white" }}> “DeltaFi Properties” </text>) are
          owned by DeltaFi and its suppliers, and are protected by intellectual property laws
          throughout the world. Use of any software and associated documentation that is made
          available via the Services
          <text style={{ fontWeight: "bold", color: "white" }}> (“Software”) </text>, other than the
          Protocol (which is comprised of open source software running on the public Solana
          blockchain), is governed by the Agreement. Subject to your compliance with the Agreement,
          DeltaFi grants you a non-assignable, non-transferable, non-sublicensable, revocable,
          non-exclusive license to use the Software for the sole purpose of enabling you to use the
          Services in the manner permitted by the Agreement. DeltaFi, its suppliers and service
          providers reserve all rights not granted in the Agreement. Some Software may be offered
          under open source licenses that we will make available to you upon your request. There may
          be provisions in the open source licenses that expressly override some of these terms.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          1.2. Updates and Usage.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          You understand that DeltaFi Properties are evolving. You acknowledge and agree that
          DeltaFi may update DeltaFi Properties or suspend access to the DeltaFi Properties with or
          without notifying you. You may need to update third-party software from time to time in
          order to use DeltaFi Properties.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          1.3. Assumption of Risk.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          By accessing and using the Interface or Protocol, you represent and warrant that you
          understand that there are inherent risks associated with cryptographic and
          blockchain-based technologies, and that you are financially and technically sophisticated
          enough to understand such risks. In particular, you accept that the value of your digital
          assets is variable and your digital assets may lose some or all of their value when
          supplied to the Protocol through the Interface. You further acknowledge and understand
          that blockchain-based transactions are irreversible, and that DeltaFi does not have the
          ability to modify or cancel any of your interactions with the relevant blockchain. You
          agree that DeltaFi is not responsible for any losses or damages associated with your
          interactions with decentralized networks and technology. You further acknowledge that
          DeltaFi is not responsible for any of the variables or risks associated with cryptographic
          and blockchain-based technologies. DeltaFi facilitates interactions with decentralized
          networks and technology, and DeltaFi does not own or control the Protocol. DeltaFi cannot
          be held liable for any resulting losses that you experience while accessing or using the
          Interface or Protocol. Accordingly, you understand and agree to assume full responsibility
          for all of the risks of accessing and using the Interface to interact with the Protocol.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          1.4. Restrictions.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          The rights granted to you in the Agreement are subject to the following restrictions:
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          <text style={{ fontWeight: "bold", color: "white" }}>(a) Usage. </text>
          You shall not: (a) license, sell, rent, lease, transfer, assign, reproduce, distribute,
          host or otherwise commercially exploit any DeltaFi Properties, including the Interface;
          (b) frame or utilize framing techniques to enclose any trademark, logo, or other DeltaFi
          Properties (including images, text, page layout or form); (c) use any metatags or other
          “hidden text” using DeltaFi’s name or trademarks; (d) modify, translate, adapt, merge,
          make derivative works of, disassemble, decompile, reverse compile or reverse engineer any
          DeltaFi Properties except to the extent the foregoing restrictions are expressly
          prohibited by applicable law; or (e) use any manual or automated software, devices or
          other processes (including but not limited to spiders, robots, scrapers, crawlers,
          avatars, data mining tools or the like) to “scrape” or download data from any web pages
          contained in the Interface (except that we grant the operators of public search engines
          revocable permission to use spiders to copy materials from the Interface for the sole
          purpose of and solely to the extent necessary for creating publicly available searchable
          indices of the materials, but not caches or archives of such materials). Except as
          expressly stated herein, no part of any DeltaFi Properties may be copied, reproduced,
          distributed, republished, downloaded, displayed, posted or transmitted in any form or by
          any means and you shall not remove or destroy any copyright notices or other proprietary
          markings contained on or in any DeltaFi Properties. Any future release, update or other
          addition to any of the DeltaFi Properties shall be subject to the Agreement. Any
          unauthorized use of any DeltaFi Property terminates the licenses granted by DeltaFi
          pursuant to the Agreement.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          <text style={{ fontWeight: "bold", color: "white" }}>(b) Conduct. </text>
          You agree that you may not, directly or indirectly, make available any information, data,
          text, software, music, sound, photographs, graphics, video, messages, tags and other
          materials (collectively, “Content”) on or through any of the DeltaFi Properties that: (i)
          infringes, misappropriates or otherwise violates any intellectual property right, right of
          publicity, right of privacy or other right of any person or entity; (ii) is unlawful,
          threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, invasive of
          another’s privacy, tortious, obscene, offensive, or profane; (iii) constitutes
          unauthorized or unsolicited advertising, junk or bulk e-mail; (iv) involves commercial
          activities and/or sales, such as contests, sweepstakes, barter, advertising, or pyramid
          schemes; (v) impersonates any person or entity; (vi) interferes with or attempts to
          interfere with the proper functioning of the DeltaFi Properties; or (vii) attempts to
          engage in or engages in, any potentially harmful acts that are directed against the
          DeltaFi Properties, including by violating or attempting to violate any security features
          of the DeltaFi Properties, introducing viruses, worms, or similar harmful code into the
          DeltaFi Properties, or interfering or attempting to interfere with use of the DeltaFi
          Properties by any other user, host or network, including by means of overloading,
          “flooding,” “spamming,” “mail bombing,” or “crashing” any DeltaFi Properties.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          <text style={{ fontWeight: "bold", color: "white" }}>(c) Cyberattacks. </text>
          In connection with your use of the DeltaFi Properties, you shall not engage in any
          activity that seeks to interfere with or compromise the integrity, security, or proper
          functioning of any computer, server, network, personal device, or other information
          technology system, including, but not limited to, the deployment of viruses and denial of
          service attacks.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          <text style={{ fontWeight: "bold", color: "white" }}>
            (d) Fraud or Misrepresentation.{" "}
          </text>
          You shall not engage in any activity that seeks to defraud DeltaFi or any other person or
          entity, including, but not limited to, providing any false, inaccurate, or misleading
          information in order to unlawfully obtain the property of another. You shall not, in any
          manner, make attempts or efforts to obtain the private key, password, account, or other
          security information of any other user, including, but not limited to, information about
          digital wallets or private keys.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          <text style={{ fontWeight: "bold", color: "white" }}>(e) Market Manipulation. </text>
          You shall not engage in any activity that violates any applicable law, rule, or regulation
          concerning the integrity of trading markets, including, but not limited to, the
          manipulative tactics commonly known as spoofing and wash trading.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          <text style={{ fontWeight: "bold", color: "white" }}>
            (f) Securities and Derivatives Violations.{" "}
          </text>
          You shall not engage in any activity that violates any applicable law, rule, or regulation
          concerning the trading of securities or derivatives.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          <text style={{ fontWeight: "bold", color: "white" }}>
            (g) Any Other Unlawful Conduct.{" "}
          </text>
          You shall not engage in any activity that violates any applicable law, rule, or regulation
          of the United States or another relevant jurisdiction, including, but not limited to, the
          restrictions and regulatory requirements imposed by U.S. law.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          1.5. Prerelease or Beta Version.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          We may designate the Services, or a feature of the Services, as a prerelease or beta
          version
          <text style={{ fontWeight: "bold", color: "white" }}> (“Beta Version”)</text>. A Beta
          Version does not represent the final product and may contain bugs that may cause system or
          other failure and data loss. We may choose not to release a commercial version of the Beta
          Version. Without limiting any disclaimer of warranty or other limitation stated in the
          Agreement, you agree that Beta Versions are not considered by DeltaFi to be suitable for
          commercial or production use, and may contain errors affecting their proper operation.
          NOTWITHSTANDING ANY OTHER PROVISION OF THE AGREEMENT, DELTAFI SPECIFICALLY DISCLAIMS
          LIABILITY FOR ALL DAMAGES RESULTING FROM YOUR USE OF ANY BETA VERSION. The fact and
          existence of any Beta Version shall be deemed to be our confidential information. You must
          promptly cease using the Beta Version and destroy all copies of the Beta Version if we
          request you to do so.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          2. REGISTRATION.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          2.1. Registering Your Account.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          In order to access or use certain features of the DeltaFi Properties you will be required
          to become a Registered User. For purposes of the Agreement, a
          <text style={{ fontWeight: "bold", color: "white" }}> “Registered User” </text>
          is a user who has registered an account with DeltaFi on the Interface
          <text style={{ fontWeight: "bold", color: "white" }}> (“Account”)</text>.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          2.2. Registration Data.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          In registering an account on the Interface, you agree to (a) provide true, accurate,
          current and complete information about yourself and if applicable, the entity you
          represent, as prompted by the registration form (the
          <text style={{ fontWeight: "bold", color: "white" }}> “Registration Data”</text>
          ); and (b) maintain and promptly update the Registration Data to keep it true, accurate,
          current and complete. You represent that you are (i) at least eighteen (18) years old;
          (ii) of legal age to form a binding contract; and (iii) not a person barred from using any
          of the DeltaFi Properties under the laws of the United States, your place of residence or
          any other applicable jurisdiction. You are responsible for all activities that occur under
          your Account. You agree to monitor your Account to restrict use by minors, and you will
          accept full responsibility for any unauthorized use of any DeltaFi Properties by minors
          under your Account. You may not share your Account information or password with anyone,
          and you agree to (y) notify DeltaFi immediately of any unauthorized use of your Account,
          password or any other breach of security; and (z) exit from your Account at the end of
          each session. If you provide any information that is untrue, inaccurate, not current or
          incomplete, or DeltaFi has reasonable grounds to suspect that any information you provide
          is untrue, inaccurate, not current or incomplete, DeltaFi has the right to suspend or
          terminate your Account and refuse any and all current or future use of any DeltaFi
          Properties. You agree not to create an Account using a false identity or information, or
          on behalf of someone other than yourself. DeltaFi reserves the right to remove or reclaim
          any usernames at any time and for any reason, including but not limited to, claims by a
          third party that a username violates the third party’s rights. You agree not to create an
          Account or use any DeltaFi Properties if you have been previously removed by DeltaFi, or
          if you have been previously banned from any DeltaFi Properties.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          2.3. Identifying Information.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          To help protect against and detect activities that may facilitate the funding of terrorism
          and money laundering, we reserve the right at any time to require you to provide
          additional identifying information as a condition of your continued use of the services.
          Such information may include, but not necessarily be limited to, legal name, address, date
          of birth, taxpayer identification number and a valid ID such as a driver’s license or
          passport. We may use such information to verify your verify your identity and, in the
          event that we are not able to do so, we may request additional information from you and/or
          suspend or terminate your account in accordance with Section 2.2. We also may use such
          information to verify compliance with OFAC sanctions.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          3. FEES.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          3.1. Payment.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          You agree to pay all fees and charges to your Account in accordance with the fees, charges
          and billing terms in effect at the time a fee or charge is due and payable in accordance
          with the Services. By providing DeltaFi with your account payment information (e.g.,
          crypto wallet, credit card or PayPal account), you agree that DeltaFi is authorized to
          immediately invoice your Account for all fees and charges as they become due and payable
          and that no additional notice or consent is required. You agree to immediately notify
          DeltaFi of any change in your account payment method or information used for payment
          hereunder. Your agreement with your payment provider governs your use of the designated
          payment account, and you must refer to that agreement, not this Agreement, to determine
          your rights and liabilities. DeltaFi reserves the right at any time to change its prices
          and billing methods, either immediately upon posting on the Interface or by e-mail
          delivery to you.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          3.2. Taxes.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          The fees and charges you are responsible for in connection with your use of any of the
          DeltaFi properties do not include any taxes. If DeltaFi determines it has a legal
          obligation to collect any taxes from you in connection with the Agreement, DeltaFi will
          collect such taxes in addition to the payment of such fees and charges, and you agree to
          pay DeltaFi such amounts. If your use of or payment for any Services is subject to any
          taxes in any jurisdiction and you have not remitted the applicable tax amount to DeltaFi,
          you will be solely responsible for the payment of such taxes and any related penalties or
          interest to the relevant tax authority, and you will indemnify DeltaFi for any liability
          or expense it may incur in connection with such taxes. Upon our request, you will provide
          DeltaFi with official receipts issued by the appropriate taxing authority, or other such
          evidence that you have paid all applicable taxes.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          4. RESPONSIBILITY FOR CONTENT
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          4.1. Types of Content.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          You acknowledge that all Content is the sole responsibility of the party from whom such
          Content originated. This means that you, and not DeltaFi, are entirely responsible for all
          Content that you upload, post, e-mail, transmit or otherwise make available (“Make
          Available”) through any DeltaFi Properties (“Your Content”), and that you and other
          Registered Users of DeltaFi Properties, and not DeltaFi, are similarly responsible for all
          Content that you and they Make Available through DeltaFi Properties (“User Content”).
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          4.2. No Obligation to Pre-Screen Content.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          You acknowledge that DeltaFi has no obligation to pre-screen Content (including, but not
          limited to, User Content), although DeltaFi reserves the right in its sole discretion to
          pre-screen, refuse or remove any Content. By entering into the Agreement, you hereby
          provide your irrevocable consent to such monitoring.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          4.3. Responsibility for Your Content.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          DeltaFi has no responsibility or liability for your deletion of any Content or for the
          accuracy or legality of any of Your Content, or for the security or privacy of Your
          Content while in transmission to the DeltaFi Properties. Certain Services may enable you
          to specify the level at which such Services restrict access to Your Content. You are
          solely responsible for applying the appropriate level of access to Your Content. If you do
          not choose, the system may default to its most permissive setting. You agree that DeltaFi
          retains the right to create reasonable limits on DeltaFi’s use and storage of User
          Content, including Your Content, such as limits on file size, storage space, processing
          capacity, and similar limits described on the Interface and as otherwise determined by
          DeltaFi in its sole discretion.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          5. OWNERSHIP.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          5.1. DeltaFi Properties.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          Except with respect to Your Content and User Content, you agree that DeltaFi and its
          suppliers own all rights, title and interest in DeltaFi Properties. You may not remove,
          alter or obscure any copyright, trademark, service mark or other proprietary rights
          notices incorporated in or accompanying any DeltaFi Properties. “DeltaFi” and all related
          graphics, logos, trademarks, service marks and trade names used on or in connection with
          any DeltaFi Properties are the trademarks of DeltaFi and may not be used without
          permission in connection with your, or any third-party, products or services. Other
          trademarks, service marks and trade names that may appear on or in DeltaFi Properties are
          the property of their respective owners.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          5.2. Your Content.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          DeltaFi does not claim ownership of Your Content. However, when you submit, post or
          publish Your Content on or in DeltaFi Properties, you represent that you own or have the
          right to submit, post, or publish, as applicable, such Your Content. You agree that you,
          not DeltaFi, are responsible for all of Your Content that you Make Available on or in
          DeltaFi Properties.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          5.3. License to Your Content.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          You grant DeltaFi a non-exclusive license to use, reproduce, and modify Your Content (in
          whole or in part) for the purposes of operating and providing DeltaFi Properties to you
          and to our other Registered Users. Please remember that other Registered Users may search
          for, see, use, modify and reproduce any of Your Content that you submit to any “public”
          area of DeltaFi Properties.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          5.4. Feedback.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          You agree that submission of any ideas, suggestions, documents, and/or proposals to
          DeltaFi through its suggestion, feedback, wiki, forum, or similar pages
          <text style={{ fontWeight: "bold", color: "white" }}> (“Feedback”) </text>
          is at your own risk and that DeltaFi has no obligations (including without limitation
          obligations of confidentiality) with respect to such Feedback. You represent and warrant
          that you have all rights necessary to submit the Feedback. You hereby grant to DeltaFi a
          fully paid, royalty-free, perpetual, irrevocable, worldwide, non-exclusive, and fully
          sublicensable right and license to use, reproduce, perform, display, distribute, adapt,
          modify, re-format, create derivative works of, and otherwise commercially or
          non-commercially exploit in any manner, any and all Feedback, and to sublicense the
          foregoing rights, in connection with the operation and maintenance of DeltaFi Properties
          and/or DeltaFi’s business.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          6. INVESTIGATIONS.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          DeltaFi may, but is not obligated to, monitor or review DeltaFi Properties and Content at
          any time. Without limiting the foregoing, DeltaFi shall have the right, in its sole
          discretion, to remove any of Your Content for any reason (or no reason), including if such
          Content violates the Agreement or any applicable law. Although DeltaFi does not generally
          monitor user activity occurring in connection with DeltaFi Properties or Content, if
          DeltaFi becomes aware of any possible violations by you of any provision of the Agreement,
          DeltaFi reserves the right to investigate such violations, and DeltaFi may, at its sole
          discretion, immediately terminate your license to use DeltaFi Properties, or change, alter
          or remove Your Content, in whole or in part, without prior notice to you.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          7. INTERACTIONS WITH OTHER USERS.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          7.1. User Responsibility.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          You are solely responsible for your interactions with other Registered Users and any other
          parties with whom you interact in connection with the DeltaFi Properties; provided,
          however, that DeltaFi reserves the right, but has no obligation, to intercede in such
          disputes. You agree that DeltaFi will not be responsible for any liability incurred as the
          result of such interactions.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          7.2. Content Provided by Other Users.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          DeltaFi Properties may contain User Content provided by other Registered Users. DeltaFi is
          not responsible for and does not control User Content. DeltaFi has no obligation to review
          or monitor, and does not approve, endorse or make any representations or warranties with
          respect to, User Content. You use all User Content and interact with other Registered
          Users at your own risk.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          8. INDEMNIFICATION.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          You agree to indemnify and hold DeltaFi, its parents, subsidiaries, affiliates, officers,
          employees, agents, partners, suppliers, and licensors (each, a “DeltaFi Party” and
          collectively, the “DeltaFi Parties”) harmless from any losses, costs, liabilities and
          expenses (including reasonable attorneys’ fees) relating to or arising out of any and all
          of the following: (a) Your Content; (b) your use of, inability to use, or access to any
          DeltaFi Property; (c) your violation of the Agreement; (d) your violation of any rights of
          another party, including any Registered Users; or (e) your violation of any applicable
          laws, rules or regulations. DeltaFi reserves the right, at its own cost, to assume the
          exclusive defense and control of any matter otherwise subject to indemnification by you,
          in which event you will fully cooperate with DeltaFi in asserting any available defenses.
          This provision does not require you to indemnify any of the DeltaFi Parties for any
          unconscionable commercial practice by such party or for such party’s fraud, deception,
          false promise, misrepresentation or concealment, or suppression or omission of any
          material fact in connection with any Services provided hereunder. You agree that the
          provisions in this section will survive any termination of your Account, the Agreement
          and/or your access to DeltaFi Properties.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          9. DISCLAIMERS.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          9.1. Non-Custodial and No Fiduciary Duties.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          DeltaFi does not hold custody of any cryptographic private keys to any digital wallets.
          You acknowledge that DeltaFi is not responsible for any loss, damage or liability arising
          from your loss of any cryptographic private keys. The Agreement is not intended to, and
          does not, create or impose any fiduciary duties on DeltaFi. You also acknowledge that
          virtual currencies, cryptocurrencies, and other blockchain-based digital assets are not
          legal tender, are not backed by the United States government, and are not subject to
          Federal Deposit Insurance Corporation or Securities Investor Protection Corporation
          protections.  The value of such digital assets may be derived from the continued
          willingness of market participants to engage in transactions involving the digital assets,
          and as a result there is the potential for permanent and total loss of value of a
          particular digital asset should the market for that digital asset disappear.  The
          volatility and unpredictability of the value of a digital asset may result in significant
          loss over a short period of time.  Additionally, other market developments, or legislative
          and regulatory changes or actions at the State, Federal, or international level may
          adversely affect the use, transfer, exchange, and value of digital assets, as well as the
          nature of and availability of blockchain protocols, decentralized and centralized
          exchanges, and other mechanisms by which individuals may possess and exchange digital
          assets.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          9.2. Non-Solicitation; No Investment Advice.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          All trades submitted through the Interface are considered unsolicited, which means that
          you have not received any investment advice from DeltaFi in connection with any trades.
          DeltaFi does not conduct a suitability review of any trades you submit via the Interface.
          DeltaFi does not represent or guarantee the accuracy or reliability or any of the
          information that is available through the Interface, and DeltaFi does not represent or
          guarantee that the information is current, complete, or appropriate for your needs. You
          alone are responsible for determining whether any investment, investment strategy or
          related transaction is appropriate for you based on your personal investment objectives,
          financial circumstances, and risk tolerance.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          9.3. Not Registered with the SEC (or any other Agency).
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          We are not registered with the U.S. Securities and Exchange Commission as a national
          securities exchange or in any other capacity. You understand and acknowledge that we do
          not broker trading orders on your behalf nor do we collect or earn fees from your trades
          on the Protocol. We also do not facilitate the execution or settlement of your trades,
          which occur entirely on the public distributed Solana blockchain, or otherwise accept and
          transmit value on your behalf or on anyone else’s behalf. We are not a money transmitter
          or virtual currency services provider.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          9.4. No Warranties: As Is.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          YOU EXPRESSLY UNDERSTAND AND AGREE THAT TO THE EXTENT PERMITTED BY APPLICABLE LAW, YOUR
          USE OF DELTAFI PROPERTIES AND THE PROTOCOL IS AT YOUR SOLE RISK, AND DELTAFI PROPERTIES
          AND THE PROTOCOL ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITH ALL FAULTS.
          DELTAFI PARTIES EXPRESSLY DISCLAIM ALL WARRANTIES, REPRESENTATIONS, AND CONDITIONS OF ANY
          KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OR
          CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT
          ARISING FROM USE OF THE DELTAFI PROPERTIES.
          <br />
          <br />
          (a) DELTAFI PARTIES MAKE NO WARRANTY, REPRESENTATION OR CONDITION THAT: (1) THE DELTAFI
          PROPERTIES OR PROTOCOL WILL MEET YOUR REQUIREMENTS; (2) YOUR USE OF DELTAFI PROPERTIES OR
          PROTOCOL WILL BE UNINTERRUPTED, TIMELY, OR SECURE; (3) THE RESULTS THAT MAY BE OBTAINED
          FROM USE OF DELTAFI PROPERTIES OR PROTOCOL WILL BE ACCURATE OR RELIABLE; OR (4) THAT THE
          DELTAFI PROPERTIES OR PROTOCOL WILL BE FREE FROM ERRORS, DEFECTS, VIRUSES, OR OTHER
          HARMFUL ELEMENTS.
          <br />
          <br />
          (b) ANY CONTENT DOWNLOADED FROM OR OTHERWISE ACCESSED THROUGH DELTAFI PROPERTIES OR
          PROTOCOL IS ACCESSED AT YOUR OWN RISK, AND YOU SHALL BE SOLELY RESPONSIBLE FOR ANY DAMAGE
          TO YOUR PROPERTY, INCLUDING, BUT NOT LIMITED TO, YOUR COMPUTER SYSTEM AND ANY DEVICE YOU
          USE TO ACCESS DELTAFI PROPERTIES OR PROTOCOL, OR ANY OTHER LOSS THAT RESULTS FROM
          ACCESSING SUCH CONTENT.
          <br />
          <br />
          (c) THE DELTAFI PROPERTIES MAY BE SUBJECT TO DELAYS, CANCELLATIONS AND OTHER DISRUPTIONS.
          DELTAFI MAKES NO WARRANTY, REPRESENTATION OR CONDITION WITH RESPECT TO THE DELTAFI
          PROPERTIES OR PROTOCOL, INCLUDING BUT NOT LIMITED TO, THE QUALITY, EFFECTIVENESS,
          REPUTATION AND OTHER CHARACTERISTICS THEREOF.
          <br />
          <br />
          (d) NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED FROM DELTAFI OR THROUGH
          ANY DELTAFI PROPERTIES OR THE PROTOCOL WILL CREATE ANY WARRANTY NOT EXPRESSLY MADE HEREIN.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          9.5. No Liability for Conduct of Third Parties.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          YOU ACKNOWLEDGE AND AGREE THAT DELTAFI PARTIES ARE NOT LIABLE, AND YOU AGREE NOT TO SEEK
          TO HOLD DELTAFI PARTIES LIABLE, FOR THE CONDUCT OF THIRD PARTIES, INCLUDING OPERATORS OF
          THE PROTOCOL AND EXTERNAL SITES, AND THAT THE RISK OF INJURY FROM SUCH THIRD PARTIES RESTS
          ENTIRELY WITH YOU.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          9.6. No Liability for Conduct of Other Users.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          YOU ARE SOLELY RESPONSIBLE FOR ALL OF YOUR COMMUNICATIONS AND INTERACTIONS WITH OTHER
          USERS OF DELTAFI PROPERTIES AND THE PROTOCOL. YOU UNDERSTAND THAT DELTAFI DOES NOT MAKE
          ANY ATTEMPT TO VERIFY THE STATEMENTS OR ACTIONS OF USERS OF DELTAFI PROPERTIES OR
          PROTOCOL. DELTAFI MAKES NO WARRANTY THAT THE GOODS OR SERVICES PROVIDED BY THIRD PARTIES
          WILL MEET YOUR REQUIREMENTS OR BE AVAILABLE ON AN UNINTERRUPTED, SECURE, OR ERROR-FREE
          BASIS.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          9.7. Third-Party Materials and Resources.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          In connection with the Services, you may have access to materials that are provided or
          hosted by another party. You agree that it is impossible for DeltaFi to monitor such
          materials and that you access these materials at your own risk. The Interface may contain
          references or links to third-party resources, including (but not limited to) information,
          materials, products, or services, that DeltaFi does not own or control. In addition, third
          parties may offer promotions related to your access and use of the Interface or Protocol.
          We do not endorse or assume any responsibility for any such resources or promotions. If
          you access any such resources or participate in any such promotions, you do so at your own
          risk, and you understand that the Agreement does not apply to your dealings or
          relationships with any third parties. You expressly relieve us of any and all liability
          arising from your use of any such resources or participation in any such promotions.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          10. LIMITATION OF LIABILITY.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          10.1. Disclaimer of Certain Damages.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          YOU UNDERSTAND AND AGREE THAT, TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT SHALL
          DELTAFI PARTIES BE LIABLE FOR ANY LOSS OF PROFITS, REVENUE, DATA OR OTHER INTANGIBLE
          PROPERTY, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, OR DAMAGES OR COSTS DUE
          TO LOSS OF PRODUCTION OR USE, BUSINESS INTERRUPTION, OR PROCUREMENT OF SUBSTITUTE
          SERVICES, IN EACH CASE WHETHER OR NOT DELTAFI HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
          DAMAGES, ARISING OUT OF OR IN CONNECTION WITH THE AGREEMENT OR ANY COMMUNICATIONS,
          INTERACTIONS OR MEETINGS WITH OTHER USERS OF DELTAFI PROPERTIES OR ANY THIRD PARTIES, ON
          ANY THEORY OF LIABILITY, RESULTING FROM: (a) THE USE OR INABILITY TO USE THE DELTAFI
          PROPERTIES; (b) THE COST OF PROCUREMENT OF SUBSTITUTE SERVICES RESULTING FROM ANY GOODS,
          DATA, INFORMATION OR SERVICES PURCHASED OR OBTAINED; OR MESSAGES RECEIVED FOR TRANSACTIONS
          ENTERED INTO THROUGH ANY DELTAFI PROPERTIES; (c) UNAUTHORIZED ACCESS TO OR ALTERATION OF
          YOUR TRANSMISSIONS OF DATA; (d) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON DELTAFI
          PROPERTIES OR THE PROTOCOL; (e) HACKING, TAMPERING, OR OTHER UNAUTHORIZED ACCESS TO OR USE
          OF THE INTERFACE OR PROTOCOL; (f) ANY ACCESS TO OR USE OF ANY INFORMATION OBTAINED BY ANY
          UNAUTHORIZED ACCESS TO OR USE OF THE INTERFACE OR PROTOCOL; OR (g) ANY OTHER MATTER
          RELATED TO DELTAFI PROPERTIES OR PROTOCOL, WHETHER BASED ON WARRANTY, COPYRIGHT, CONTRACT,
          TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER LEGAL THEORY. THE FOREGOING
          LIMITATION OF LIABILITY SHALL NOT APPLY TO LIABILITY OF A DELTAFI PARTY FOR (i) DEATH OR
          PERSONAL INJURY CAUSED BY A DELTAFI PARTY’S NEGLIGENCE; OR FOR (ii) ANY INJURY CAUSED BY A
          DELTAFI PARTY’S FRAUD OR FRAUDULENT MISREPRESENTATION. DELTAFI ASSUMES NO LIABILITY OR
          RESPONSIBILITY FOR ANY: (i) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT; (ii) PERSONAL
          INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM ANY ACCESS OR USE OF
          THE DELTAFI PROPERTIES OR PROTOCOL; (iii) UNAUTHORIZED ACCESS OR USE OF ANY SECURE SERVER
          OR DATABASE IN OUR CONTROL, OR THE USE OF ANY INFORMATION OR DATA STORED THEREIN; (d)
          INTERRUPTION OR CESSATION OF FUNCTION RELATED TO THE INTERFACE OR PROTOCOL; (iv) BUGS,
          VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH THE INTERFACE OR
          PROTOCOL; (v) ERRORS OR OMISSIONS IN, OR LOSS OR DAMAGE INCURRED AS A RESULT OF THE USE
          OF, ANY CONTENT MADE AVAILABLE THROUGH THE INTERFACE OR PROTOCOL; and (vi) THE DEFAMATORY,
          OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          10.2. Cap on Liability.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          TO THE FULLEST EXTENT PROVIDED BY LAW, DELTAFI PARTIES WILL NOT BE LIABLE TO YOU FOR MORE
          THAN THE GREATER OF (a) THE TOTAL AMOUNT PAID TO DeltaFi by you during the THREE-month
          period prior to the act, omission or occurrence giving rise to such liability; OR (b) THE
          REMEDY OR PENALTY IMPOSED BY THE STATUTE UNDER WHICH SUCH CLAIM ARISES. THE FOREGOING CAP
          ON LIABILITY SHALL NOT APPLY TO LIABILITY OF A DELTAFI PARTY FOR (i) DEATH OR PERSONAL
          INJURY CAUSED BY A DELTAFI PARTY’S NEGLIGENCE; OR FOR (ii) ANY INJURY CAUSED BY A DELTAFI
          PARTY’S FRAUD OR FRAUDULENT MISREPRESENTATION.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          10.3. User Content.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          EXCEPT FOR DELTAFI’S OBLIGATIONS TO PROTECT YOUR PERSONAL DATA AS SET FORTH IN THE
          DELTAFI’S PRIVACY POLICY, DELTAFI ASSUMES NO RESPONSIBILITY FOR THE TIMELINESS, DELETION,
          MIS-DELIVERY OR FAILURE TO STORE ANY CONTENT (INCLUDING, BUT NOT LIMITED TO, YOUR CONTENT
          AND USER CONTENT), USER COMMUNICATIONS OR PERSONALIZATION SETTINGS.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          10.4. Exclusion of Damages.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          CERTAIN JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF
          THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE EXCLUSIONS OR LIMITATIONS MAY NOT APPLY
          TO YOU, AND YOU MIGHT HAVE ADDITIONAL RIGHTS.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          10.5. Basis of the Bargain.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          THE EXCLUSIONS AND LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE
          BASIS OF THE BARGAIN BETWEEN DELTAFI AND YOU.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          11. MONITORING AND ENFORCEMENT.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          DeltaFi reserves the right to: (a) take appropriate legal action, including without
          limitation, referral to law enforcement, for any illegal or unauthorized use of the
          DeltaFi Properties and/or (b) terminate or suspend your access to all or part of the
          DeltaFi Properties for any or no reason, including without limitation, any violation of
          the Agreement. If DeltaFi becomes aware of any possible violations by you of the
          Agreement, DeltaFi reserves the right to investigate such violations. If, as a result of
          the investigation, DeltaFi believes that criminal activity has occurred, DeltaFi reserves
          the right to refer the matter to, and to cooperate with, any and all applicable legal
          authorities. DeltaFi is entitled, except to the extent prohibited by applicable law, to
          disclose any information or materials on or in DeltaFi Properties, including Your Content,
          in DeltaFi’s possession in connection with your use of DeltaFi Properties, to (i) comply
          with applicable laws, legal process or governmental request; (ii) enforce the Agreement,
          (iii) respond to any claims that Your Content violates the rights of third parties, (iv)
          respond to your requests for customer service, or (v) protect the rights, property or
          personal safety of DeltaFi, its Registered Users or the public, and all enforcement or
          other government officials, as DeltaFi in its sole discretion believes to be necessary or
          appropriate.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          12. TERM AND TERMINATION.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          12.1. Term.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          The Agreement commences on the earlier to occur of (a) the date when you accept it (as
          described in the first paragraph of these Terms of Use above) and (b) the date you first
          used any of the DeltaFi Properties, and remains in full force and effect while you use any
          DeltaFi Properties, unless terminated earlier in accordance with the Agreement.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          12.2. Termination by DeltaFi.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          If you have materially breached any provision of the Agreement, or if DeltaFi is required
          to do so by law (e.g., where the provision of any of the Services or other DeltaFi
          Properties becomes unlawful), DeltaFi has the right to, immediately and without notice,
          suspend or terminate any Services or other DeltaFi Properties provided to you. You agree
          that all such terminations will be made in DeltaFi’s sole discretion and that DeltaFi will
          not be liable to you or any third party for any termination of your Account.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          12.3. Termination of Services by You.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          If you want to terminate the Services provided by DeltaFi, you may do so by (a) notifying
          DeltaFi at any time and (b) closing your Account for all of the Services that you use.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          12.4. Effect of Termination.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          Termination of any Service includes removal of access to such Service and barring of
          further use of the Service. Termination of all Services also includes deletion of your
          password and all related information, files and Content associated with or inside your
          Account (or any part thereof), including Your Content. Upon termination of any Service,
          your right to use such Service will automatically terminate immediately. You understand
          that any termination of Services may involve deletion of Your Content associated therewith
          from our live databases. DeltaFi will not have any liability whatsoever to you for any
          suspension or termination, including for deletion of Your Content. All provisions of the
          Agreement which by their nature should survive, shall survive termination of Services,
          including without limitation, ownership provisions, disclaimers, indemnification
          obligations, and limitation of liability.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          12.5. No Subsequent Registration.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          If your registration(s) with, or ability to access DeltaFi Properties is discontinued by
          DeltaFi due to your violation of any portion of the Agreement or for conduct otherwise
          inappropriate, then you agree that you shall not attempt to re-register with or access
          DeltaFi Properties through use of a different member name or otherwise, and you
          acknowledge that you will not be entitled to receive a refund for fees related to those
          DeltaFi Properties to which your access has been terminated. In the event that you violate
          the immediately preceding sentence, DeltaFi reserves the right, in its sole discretion, to
          immediately take any or all of the actions set forth herein without any notice or warning
          to you.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          13. INTERNATIONAL USERS.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          DeltaFi Properties can be accessed from countries around the world and may contain
          references to Services and Content that are not available in your country. These
          references do not imply that DeltaFi intends to announce such Services or Content in your
          country. DeltaFi Properties are controlled and offered by DeltaFi from its facilities in
          the United States of America. DeltaFi makes no representations that DeltaFi Properties are
          appropriate or available for use in other locations. Those who access or use DeltaFi
          Properties from other countries do so at their own volition and are responsible for
          compliance with local law.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          14. DISPUTE RESOLUTION.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          <text style={{ fontWeight: "bold", color: "white" }}>
            Please read the following arbitration agreement (“Arbitration Agreement) in this Section
            14 (Dispute Resolution) carefully. It requires users to arbitrate disputes with DeltaFi
            and limits the manner in which you can seek relief from us.
          </text>
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          14.1. Applicability of Arbitration Agreement.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          You agree that any dispute between you and us (or other DeltaFi Parties) relating in any
          way to the Services or the Agreement will be resolved by binding arbitration, rather than
          in court, except that (1) you and the DeltaFi Parties may assert claims in small claims
          court if the claims qualify; and (2) you or the DeltaFi Parties may seek equitable relief
          in court for infringement or other misuse of intellectual property rights (such as
          trademarks, trade dress, domain names, trade secrets, copyrights, and patents).
          <br />
          <text style={{ fontWeight: "bold", color: "white" }}>
            This Arbitration Agreement shall apply, without limitation, to all claims that arose or
            were asserted before the effective date of this Agreement or any prior version of the
            Agreement.
          </text>
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          14.2. Arbitration Rules and Forum.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          The Federal Arbitration Act governs the interpretation and enforcement of this Arbitration
          Agreement. To begin an arbitration proceeding, you must send a letter requesting
          arbitration and describing your claim to our registered agent: [INSERT]. The arbitration
          will be conducted by JAMS, an established alternative dispute resolution provider.
          Disputes involving claims and counterclaims with an amount in controversy under $250,000,
          not inclusive of attorneys’ fees and interest, shall be subject to JAMS’ most current
          version of the Streamlined Arbitration Rules and procedures available at
          http://www.jamsadr.com/rules-streamlined-arbitration/; all other claims shall be subject
          to JAMS’s most current version of the Comprehensive Arbitration Rules and Procedures,
          available at http://www.jamsadr.com/rules-comprehensive-arbitration/. JAMS’s rules are
          also available at www.jamsadr.comor by calling JAMS at 800-352-5267. If JAMS is not
          available to arbitrate, the parties will select an alternative arbitral forum. If the
          arbitrator finds that you cannot afford to pay JAMS’s filing, administrative, hearing
          and/or other fees and you cannot obtain a waiver from JAMS, DeltaFi will pay them for you.
          You may choose to have the arbitration conducted by telephone, based on written
          submissions, or in person in the U.S. county where you live or at another mutually agreed
          location. Any judgment on the award rendered by the arbitrator may be entered in any court
          of competent jurisdiction.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          14.3. Authority of Arbitrator.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          Without limiting the scope of Section 14.1 (Applicability of Arbitration Agreement), the
          arbitrator shall have exclusive authority to resolve any dispute related to the
          interpretation, applicability, enforceability or formation of this Arbitration Agreement
          including, but not limited to any claim that all or any part of this Arbitration Agreement
          is void or voidable. The arbitrator will decide the rights and liabilities, if any, of you
          and the DeltaFi Parties. The arbitration proceeding will not be consolidated with any
          other matters or joined with any other proceedings or parties. The arbitrator shall have
          the authority to grant motions dispositive of all or part of any claim or dispute. The
          arbitrator shall have the authority to award monetary damages and to grant any
          non-monetary remedy or relief available to an individual party under applicable law, the
          arbitral forum’s rules, and the Agreement (including the Arbitration Agreement). The
          arbitrator shall issue a written award and statement of decision describing the essential
          findings and conclusions on which any award (or decision not to render an award) is based,
          including the calculation of any damages awarded. The arbitrator shall follow the
          applicable law. The arbitrator has the same authority to award relief on an individual
          basis that a judge in a court of law would have. The award of the arbitrator is final and
          binding upon you and us.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          14.4. Waiver of Jury Trial.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          YOU AND the DeltaFi parties HEREBY WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO SUE IN
          COURT (OTHER THAN SMALL CLAIMS COURT AS PERMITTED HEREIN) AND HAVE A TRIAL IN FRONT OF A
          JUDGE OR A JURY. You and the DeltaFi Parties are instead electing that all covered claims
          and disputes shall be resolved by arbitration under this Arbitration Agreement, except as
          specified in Section 14.1 (Applicability of Arbitration Agreement) above. An arbitrator
          can award on an individual basis the same damages and relief as a court and must follow
          this Agreement as a court would. However, there is no judge or jury in arbitration, and
          court review of an arbitration award is subject to very limited review.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          14.5. Waiver of Class or Other Non-Individualized Relief.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT MUST BE ARBITRATED
          ON AN INDIVIDUAL BASIS AND NOT ON A CLASS OR COLLECTIVE BASIS, ONLY INDIVIDUAL RELIEF IS
          AVAILABLE FOR CLAIMS COVERED BY THIS ARBITRATION AGREEMENT, AND CLAIMS BY OR AGAINST ONE
          USER CANNOT BE ARBITRATED OR CONSOLIDATED WITH THOSE OF OR AGAINST ANY OTHER USER OR
          PERSON. If a decision is issued stating that applicable law precludes enforcement of any
          of this Section’s limitations as to a given claim for relief, then the applicable claim,
          and only that applicable claim, must be severed from the arbitration and brought into the
          state or federal courts located in New York, New York in accordance with Section 15.6
          (Exclusive Venue). All other claims shall be arbitrated.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          14.6. 30-Day Right to Opt Out.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          You have the right to opt out of the provisions of this Arbitration Agreement by sending a
          timely written notice of your decision to opt out to the following address:
          legal@deltafi.ai, within 30 days after first becoming subject to this Arbitration
          Agreement. Your notice must include your name and address and a clear statement that you
          want to opt out of this Arbitration Agreement. If you opt out of this Arbitration
          Agreement, all other parts of this Agreement will continue to apply to you. Opting out of
          this Arbitration Agreement has no effect on any other arbitration agreements that you may
          currently have with us, or may enter into in the future with us or other DeltaFi Parties.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          14.7. Severability.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          Except as provided in Section 14.5 (Waiver of Class or Other Non-Individualized Relief),
          if any part or parts of this Arbitration Agreement are found under the law to be invalid
          or unenforceable, then such specific part or parts shall be of no force and effect and
          shall be severed and the remainder of the Arbitration Agreement shall continue in full
          force and effect.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          14.8. Survival of Agreement.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          This Arbitration Agreement will survive the termination or expiration of the Agreement or
          your relationship with DeltaFi.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          14.9. Modification.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          Notwithstanding any provision in this Agreement to the contrary, we agree that if DeltaFi
          makes any future material change to this Arbitration Agreement, you may reject that change
          within thirty (30) days of such change becoming effective by writing DeltaFi at the
          following address: DeltaFi, legal@deltafi.ai.
        </Typography>
        <Typography variant="h6" align="left" className={classes.header}>
          15. GENERAL PROVISIONS.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          15.1. Electronic Communications.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          The communications between you and DeltaFi may take place via electronic means (including
          e-mails, text messages and push notifications), whether you visit DeltaFi Properties or
          send DeltaFi communications, or whether DeltaFi posts notices on DeltaFi Properties or
          communicates with you via e-mail, text message or push notification. For contractual
          purposes, you (a) consent to receive communications from DeltaFi in an electronic form;
          and (b) agree that all terms and conditions, agreements, notices, disclosures, and other
          communications that DeltaFi provides to you electronically satisfy any legal requirement
          that such communications would satisfy if it were to be in writing. The foregoing does not
          affect your statutory rights, including but not limited to the Electronic Signatures in
          Global and National Commerce Act at 15 U.S.C. §7001 et seq.
          <text style={{ fontWeight: "bold", color: "white" }}> (“E-Sign”)</text>.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          15.2. Release.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          You hereby release DeltaFi Parties and their successors from claims, demands, any and all
          losses, damages, rights, and actions of any kind, including personal injuries, death, and
          property damage, that is either directly or indirectly related to or arises from your use
          of DeltaFi Properties, including but not limited to, any interactions with or conduct of
          other Users or third-party products, services, or websites of any kind arising in
          connection with or as a result of the Agreement or your use of DeltaFi Properties. If you
          are a California resident, you hereby waive California Civil Code Section 1542, which
          states, “A general release does not extend to claims that the creditor or releasing party
          does not know or suspect to exist in his or her favor at the time of executing the release
          and that, if known by him or her, would have materially affected his or her settlement
          with the debtor or released party.” The foregoing release does not apply to any claims,
          demands, or any losses, damages, rights and actions of any kind, including personal
          injuries, death or property damage for any unconscionable commercial practice by a DeltaFi
          Party or for such party’s fraud, deception, false, promise, misrepresentation or
          concealment, suppression or omission of any material fact in connection with the Interface
          or any Services provided hereunder.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          15.3. Assignment.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          The Agreement, and your rights and obligations hereunder, may not be assigned,
          subcontracted, delegated or otherwise transferred by you without DeltaFi’s prior written
          consent, and any attempted assignment, subcontract, delegation, or transfer in violation
          of the foregoing will be null and void.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          15.4. Force Majeure.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          DeltaFi shall not be liable for any delay or failure to perform resulting from causes
          outside its reasonable control, including, but not limited to, acts of God, pandemics,
          epidemics, war, terrorism, riots, embargos, acts of civil or military authorities, fire,
          floods, accidents, strikes or shortages of labor or materials.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          15.5. Questions, Complaints, Claims.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          If you have any questions, complaints or claims with respect to DeltaFi Properties, please
          contact us at: legal@deltafi.ai. We will do our best to address your concerns. If you feel
          that your concerns have been addressed incompletely, we invite you to let us know for
          further investigation.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          15.6. Exclusive Venue.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          To the extent the parties are permitted under the Agreement to initiate litigation in a
          court, both you and DeltaFi agree that all claims and disputes arising out of or relating
          to the Agreement will be litigated exclusively in the state or federal courts located in
          Santa Clara County, California.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          15.7. Governing Law.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          THE TERMS AND ANY ACTION RELATED THERETO WILL BE GOVERNED AND INTERPRETED BY AND UNDER THE
          LAWS OF THE STATE OF CALIFORNIA, CONSISTENT WITH THE FEDERAL ARBITRATION ACT, WITHOUT
          GIVING EFFECT TO ANY PRINCIPLES THAT PROVIDE FOR THE APPLICATION OF THE LAW OF ANOTHER
          JURISDICTION. THE UNITED NATIONS CONVENTION ON CONTRACTS FOR THE INTERNATIONAL SALE OF
          GOODS DOES NOT APPLY TO THE AGREEMENT.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          15.8. Notice.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          Where DeltaFi requires that you provide an e-mail address, you are responsible for
          providing DeltaFi with your most current e-mail address. In the event that the last e-mail
          address you provided to DeltaFi is not valid, or for any reason is not capable of
          delivering to you any notices required/ permitted by the Agreement, DeltaFi’s dispatch of
          the e-mail containing such notice will nonetheless constitute effective notice. You may
          give notice to DeltaFi at the following address: legal@deltafi.ai. Such notice shall be
          deemed given when received by DeltaFi by letter delivered by nationally recognized
          overnight delivery service or first class postage prepaid mail at the above address.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          15.9. Waiver.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          Any waiver or failure to enforce any provision of the Agreement on one occasion will not
          be deemed a waiver of any other provision or of such provision on any other occasion.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          15.10. Severability.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          If any portion of this Agreement is held invalid or unenforceable, that portion shall be
          construed in a manner to reflect, as nearly as possible, the original intention of the
          parties, and the remaining portions shall remain in full force and effect.
        </Typography>
        <Typography variant="h6" align="left" className={classes.secondary}>
          15.11. Entire Agreement.
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          The Agreement is the final, complete and exclusive agreement of the parties with respect
          to the subject matter hereof and supersedes and merges all prior discussions between the
          parties with respect to such subject matter.
        </Typography>
        <Typography
          variant="h6"
          align="left"
          className={classes.header}
          style={{ paddingTop: 300 }}
        >
          CONTACT INFORMATION
        </Typography>
        <Typography variant="h6" align="left" className={classes.text}>
          If you have any questions about these Terms or the Services, please contact Deltafi at
          legal@deltafi.ai
        </Typography>
      </Box>
    </Page>
  );
};
export default Home;
