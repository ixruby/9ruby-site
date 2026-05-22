export type VercelProjectKind = "9ruby" | "client" | "preview" | "unpublished"

export type VercelShowcaseProject = {
  name: string
  url: string | null
  updatedAt: number
  nodeVersion: string
  kind: VercelProjectKind
}

const vercelProjectRows = `
v0-dbk|https://dbkdigitals.com|1778467193927|24.x
monocore|https://monocore.9ruby.com|1778454821112|24.x
nightops|https://nightops.9ruby.com|1778454808260|24.x
launchgrid|https://launchgrid.9ruby.com|1778454793242|24.x
gridum-9ruby|https://gridum.9ruby.com|1778452021503|24.x
producthub-9ruby|https://producthub.9ruby.com|1778451601128|24.x
source|https://source-ixr.vercel.app|1778451150838|24.x
steadystate-9ruby|https://steadystate-9ruby.vercel.app|1778450736532|24.x
framewell-9ruby|https://framewell-9ruby.vercel.app|1778450718810|24.x
flamerx-9ruby|https://flamerx-9ruby.vercel.app|1778450701178|24.x
write-9ruby|https://write-9ruby.vercel.app|1778450682684|24.x
produck-9ruby|https://produck-9ruby.vercel.app|1778450665496|24.x
tradeforge-9ruby|https://tradeforge-9ruby.vercel.app|1778450643783|24.x
creativaxis-9ruby|https://creativaxis-9ruby.vercel.app|1778450625699|24.x
agenvine-9ruby|https://agenvine-9ruby.vercel.app|1778450607815|24.x
flowgrid-9ruby|https://flowgrid-9ruby.vercel.app|1778450573450|24.x
palettelab|https://palettelab.9ruby.com|1778443130393|24.x
badgelive|https://badgelive.9ruby.com|1778442936544|24.x
forgestack|https://forgestack.9ruby.com|1778442660262|24.x
queuespark|https://queuespark.9ruby.com|1778442622647|24.x
accessnine|https://accessnine.9ruby.com|1778442600215|24.x
limitless-9ruby|https://limitless.9ruby.com|1778442075245|24.x
portfolite-9ruby|https://portfolite.9ruby.com|1778442064967|24.x
hypersonic-9ruby|https://hypersonic.9ruby.com|1778442051674|24.x
handyman-9ruby|https://handyman.9ruby.com|1778442040535|24.x
consulting-9ruby|https://consulting.9ruby.com|1778442030299|24.x
claritycare-9ruby|https://claritycare.9ruby.com|1778442019217|24.x
groomify-9ruby|https://groomify.9ruby.com|1778442009543|24.x
plumbing-9ruby|https://plumbing.9ruby.com|1778441997622|24.x
message-9ruby|https://message.9ruby.com|1778441985936|24.x
dreelio-9ruby|https://dreelio.9ruby.com|1778441974553|24.x
gardener-9ruby|https://gardener.9ruby.com|1778441963161|24.x
pearl-9ruby|https://pearl.9ruby.com|1778441950896|24.x
remote-9ruby|https://remote-9ruby.vercel.app|1778441937780|24.x
cryptix-9ruby|https://cryptix.9ruby.com|1778441925260|24.x
perform-9ruby|https://perform.9ruby.com|1778441911604|24.x
draftr-9ruby|https://draftr.9ruby.com|1778441899961|24.x
alytics-9ruby|https://alytics.9ruby.com|1778441888417|24.x
kavi-9ruby|https://kavi.9ruby.com|1778441874457|24.x
meridian-9ruby|https://meridian.9ruby.com|1778441863123|24.x
xtract-9ruby|https://xtract.9ruby.com|1778441852582|24.x
v0-9ruby-home|https://9ruby.com|1778440605792|24.x
v0-optimus-the-ai-platform-to-bu|--|1778438793336|24.x
framer-template-vault|https://framer-template-vault.vercel.app|1778437352469|24.x
ruby-os|https://terminal.9ruby.com|1778436706889|24.x
emberlit|https://emberlit.9ruby.com|1778436168270|24.x
mindloop|https://mindloop.9ruby.com|1778430299685|24.x
acrylic-mirrors|https://acrylicmirrors.in|1778426310312|24.x
araknova|https://araknova.vercel.app|1778422914581|24.x
ness|https://ness.9ruby.com|1778411460638|24.x
abyssal|https://abyssal.9ruby.com|1778369670072|24.x
ea-portal|https://www.eaportal.ae|1778337275925|24.x
voltclaw|https://voltclaw.9ruby.com|1778283450338|24.x
crow-the-legend|https://crow-the-legend.vercel.app|1778242610075|24.x
ratatosk|https://ratatosk-ixr.vercel.app|1778242035861|24.x
aurelia|https://aurelia-ixr.vercel.app|1778237977785|24.x
bloomwater|https://bloomwater.9ruby.com|1778201334639|24.x
creatures-deep|https://creatures-deep.vercel.app|1778185213231|24.x
misri-ayur|https://www.misryayur.com|1778158478949|24.x
frostveil|https://frostveil.9ruby.com|1778110748116|24.x
brandkit-system|https://brandkit-system.vercel.app|1778104895652|24.x
brandkit-pro|https://brandkit-pro.vercel.app|1778104869440|24.x
ride-quest|https://ride-quest-ixr.vercel.app|1778104837261|24.x
framer|https://framer-ixr.vercel.app|1778104807656|24.x
pop-show|https://pop-show.9ruby.com|1778104286252|24.x
valorant|https://valorant.9ruby.com|1778104058189|24.x
coffee-shop|https://coffee-shop.9ruby.com|1778103818913|24.x
akcb-beast|https://akcb-beast.9ruby.com|1778103475849|24.x
clearpath-therapy|https://clearpath-therapy.9ruby.com|1778102988782|24.x
bake-today-organic|https://bake-today-organic.9ruby.com|1778102722680|24.x
krai-gravity|https://krai-gravity.9ruby.com|1778102527061|24.x
mtv-brand|https://mtv-brand.9ruby.com|1778102333767|24.x
altrum|https://altrum.9ruby.com|1778102130628|24.x
camping-travel|https://camping-travel.9ruby.com|1778100662372|24.x
pop-show-alt|https://pop-show-alt.9ruby.com|1778100623446|24.x
femmefitt-style|https://femmefitt-style.9ruby.com|1778100604254|24.x
femmefit-lookbook|https://femmefit-lookbook.9ruby.com|1778100584890|24.x
starbucks-whats-yours|https://starbucks-whats-yours.9ruby.com|1778100539540|24.x
reelers|https://reelers.9ruby.com|1778100510071|24.x
grow-plus|https://grow-plus.9ruby.com|1778100491406|24.x
orvion-space|https://orvion-space.9ruby.com|1778100470679|24.x
raze-runway-alt|https://raze-runway-alt.9ruby.com|1778100452422|24.x
raze-runway|https://raze-runway.9ruby.com|1778100431587|24.x
forward-2026-alt|https://forward-2026-alt.9ruby.com|1778100382147|24.x
forward-2026|https://forward-2026.9ruby.com|1778100358472|24.x
bake-today|https://bake-today.9ruby.com|1778100309484|24.x
clearpath|https://clearpath.9ruby.com|1778100258952|24.x
design-agency|https://design-agency.9ruby.com|1778100239714|24.x
brandkit|https://brandkit.9ruby.com|1778100218227|24.x
novasite|https://brandkit-nine.vercel.app|1778081199299|24.x
clear-path|https://clear-path-ixr.vercel.app|1778080078329|24.x
luna|https://luna.9ruby.com|1778079692636|24.x
claura|https://claura.9ruby.com|1778078733908|24.x
cpanel|https://cpanel.9ruby.com|1777993920955|24.x
ts-lab|https://monorepo-vishnu-madhav-projects.vercel.app|1777905630773|24.x
next-vercel|https://nextjs-nine-beta-42.vercel.app|1777905629918|24.x
acme-v0|https://marketing-website-2.vercel.app|1777905629079|24.x
ruby-scroll|https://ruby-scroll.vercel.app|1777905628226|24.x
ruby-ascend|https://ruby-ascend.vercel.app|1777905627421|24.x
rubix-logo|https://rubix-logo.vercel.app|1777905626600|24.x
ix-site|https://ix-ruby-site.vercel.app|1777905625784|24.x
ixr-galaxy|https://ixr-galaxy.vercel.app|1777905624921|24.x
ruby-remote|https://ruby-remote.vercel.app|1777905624056|24.x
rubix-app|https://rubix-app.vercel.app|1777905623247|24.x
templates|https://ix-ruby-templates.vercel.app|1777905622384|24.x
assets|--|1777905621478|24.x
store|https://ix-ruby-store.vercel.app|1777905620587|24.x
kailas-portal|https://kailas-portal.vercel.app|1777905619692|24.x
chaiwala|https://chaiwala.9ruby.com|1777905618781|24.x
agency|https://v0-agency.9ruby.com|1777905617917|24.x
nine-ai|https://ai.9ruby.com|1777905617047|24.x
nine-builder|--|1777905616156|24.x
novavox|https://novavox.in|1777905614984|24.x
aura-voxel|https://auravoxel.com|1777905614046|24.x
nest-vercel|https://nestjs-on-vercel-black.vercel.app|1777905613137|24.x
platform-kit|--|1777905612297|24.x
eyespecx-v1|https://eyespecx.9ruby.com|1777905611442|24.x
draftly|https://draftly-architect.vercel.app|1777905610056|24.x
aquarium|https://underwater-forest-aquarium.vercel.app|1777905608223|24.x
site-backup|https://website-ixr.vercel.app|1777905607290|24.x
stitch-yoga-v0|https://stitch-yoga.vercel.app|1777905606430|24.x
sounik|https://sounik.9ruby.com|1777905605422|24.x
bloom|https://ruby.9ruby.com|1777905604545|24.x
funky-site|https://funky.9ruby.com|1777905603749|24.x
delulu-cookies|https://cookies.delulu.kids|1777905602759|24.x
eyespecx|https://www.eyespecx.com|1777849273522|24.x
delulu.kids|https://art.delulu.kids|1777849249160|24.x
leaforia|https://app.leaforia.green|1777753174595|24.x
v0-dashboard-m-o-n-k-y-ut|--|1777587031956|24.x
v0-dashboard-m-o-n-k-y|--|1777586560026|24.x
leaforia-src|https://www.leaforia.green|1777552475403|24.x
pumpkin-agency|https://pumpkin-agency.vercel.app|1777506614079|24.x
leaforia-mobile|https://leaforia-mobile.vercel.app|1777382870831|24.x
liforia-preview-v1|https://liforia-preview-v1.vercel.app|1777373645143|24.x
decaza|https://decaza.9ruby.com|1777309212570|24.x
justai-thane|https://justai-thane.vercel.app|1777307595225|24.x
v0-azka|https://azkaads.in|1777230598228|24.x
azka-international|https://azka-international.vercel.app|1777230272461|24.x
auravoxel-website|--|1777224880219|24.x
legal-construction|https://eaportel.com|1777150582202|24.x
thesmokeshop|https://thesmokeshop.9ruby.com|1777125433671|24.x
maison|https://maison-ixr.vercel.app|1777010173292|24.x
eyespecx-legacy|https://www.eyepecx.com|1776851211893|24.x
v0-shader-gradient-component-3w|--|1776535931791|24.x
v0-shader-gradient-component|--|1776531978985|24.x
nova-ecommerce|https://nova-ecommerce-ixr.vercel.app|1776501810161|24.x
terminal9|https://terminal9.vercel.app|1776489399482|24.x
rubix-browser|https://rubix-browser.vercel.app|1776447367566|24.x
vissionx|https://vissionx.vercel.app|1776361152224|24.x
.sounik-deploy|https://sounik-deploy.vercel.app|1776194091284|24.x
v0-9ruby-site|https://9ruby.com|1776182422049|24.x
v0-coffeeshop|https://coffeeshop-9ruby.vercel.app|1776172372711|24.x
v0-foodies|https://foodies-9ruby.vercel.app|1776172355785|24.x
v0-bakehouse|https://bakehouse-9ruby.vercel.app|1776172338616|24.x
v0-serenity|https://serenity-9ruby.vercel.app|1776172322318|24.x
v0-cafe|https://v0-cafe-ixr.vercel.app|1776172175311|24.x
v0-antigravity|https://v0-antigravity-ixr.vercel.app|1776171893484|24.x
v0-storybook|https://ixruby-storybook.vercel.app|1776171848244|24.x
v1-nexlyn|https://nexlyn-self.vercel.app|1776171798781|24.x
v0-dinecraft|https://dinecraft.9ruby.com|1776171349532|24.x
v0-tea-corner|https://tea-corner-9ruby.vercel.app|1776171348384|24.x
v0-chefskitchen|https://chefskitchen.9ruby.com|1776171346608|24.x
v0-baagoo-fork|https://vishnu-madhavan-git-baagoo-certifie.vercel.app|1776171341013|24.x
v0-baagoo|https://baagoo-certified-reborn.vercel.app|1776171339360|24.x
v0-property|https://property-website-ixr.vercel.app|1776171336656|24.x
v0-zeroclaw|https://zeroclaw-nanoclaw-bridge-ixr.vercel.app|1776171335716|24.x
v0-galaxy-tokens|https://ixr-galaxy-tokens.vercel.app|1776171333782|24.x
v0-ruby-os|https://nine-ruby-os.vercel.app|1776171292900|24.x
v0-proxy|https://ruby-proxy.vercel.app|1776171290311|24.x
v0-icons|https://ix-ruby-icons.vercel.app|1776171286673|24.x
v0-azkaads|https://azkaads.com|1776171222598|24.x
v1-azka|https://azka-site.vercel.app|1776171221712|24.x
v1-rubix|https://rubix-deploy.vercel.app|1776171218817|24.x
v3-nexlyn|https://marketing-website-five-gray.vercel.app|1776171174407|24.x
v2-1-nexlyn|https://www.nexlyndistribution.com|1776171173620|24.x
v2-nexlyn|https://nexlyn-v2.vercel.app|1776171172738|24.x
v0-nexlyn|https://www.nexlyndistribution.com|1776171170876|24.x
v0-stitch-records|https://stitchnovavoxrecordlabel.vercel.app|1776171164975|24.x
v0-novavox-stitch|https://novavox-stitch.vercel.app|1776171164180|24.x
v3-novavox-spatial|https://novavox-spatial.vercel.app|1776171163159|24.x
v2-novavox|https://novavox-web.vercel.app|1776171162363|24.x
v1-novavox|https://novavox-site.vercel.app|1776171161587|24.x
v4-qanllc|https://v4-qanllc.9ruby.com|1776171159999|24.x
v3-qanllc|https://qan-llc-v3.vercel.app|1776171159219|24.x
v2-qanllc|https://qan-llc-v2.vercel.app|1776171158416|24.x
v0-qanllc|https://qanllc-9ruby.vercel.app|1776171142567|24.x
v0-newsletter-template|--|1775667519283|24.x
v0-compute-the-platform-to-build|--|1775008623260|24.x
v0-chord-grid|--|1773886411115|24.x
chatbot|--|1773885331934|24.x
sandbox-test|--|1773873288129|24.x
app-directory|https://app-directory-two-sooty-52.vercel.app|1772759602593|24.x
`

function getProjectKind(url: string | null): VercelProjectKind {
  if (!url) return "unpublished"
  if (url.includes(".9ruby.com") || url === "https://9ruby.com") return "9ruby"
  if (url.includes(".vercel.app")) return "preview"
  return "client"
}

export const vercelShowcaseProjects: readonly VercelShowcaseProject[] = vercelProjectRows
  .trim()
  .split("\n")
  .map((row) => {
    const [name, rawUrl, updatedAt, nodeVersion] = row.split("|")
    const url = rawUrl === "--" ? null : rawUrl
    return {
      name,
      url,
      updatedAt: Number(updatedAt),
      nodeVersion,
      kind: getProjectKind(url),
    }
  })

export const vercelProjectKinds = ["All", "9ruby", "client", "preview", "unpublished"] as const
