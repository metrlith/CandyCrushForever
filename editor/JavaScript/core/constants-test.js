export const GRID_SIZE = 9;
export const MAX_REQUIREMENTS = 100;
export const DEFAULT_MOVES = 15;
export const DEFAULT_TIME = 30;
export const DEFAULT_FROG_STOMACH_SIZE = 13;
export const SCALE_FACTOR_WIDTH = 0.00078;
export const SCALE_FACTOR_HEIGHT = 0.00078;

export const layers = [
    "tile", "path", "leaf", "portal_entrance", "portal_exit", "normal",
    "bonbonoverlay", "sugarcoat", "lock", "glass", "indicators",
    "wallup", "walldown", "wallleft", "wallright", "rainbow_cannon_top",
    "rainbow_cannon_bottom", "rainbow_cannon_left", "rainbow_cannon_right",
    "ingredients_exit", "candy_cannon", "candy_entrance", "exit_note",
    "entry_note", "notes", "selectimg"
];

const colors = {"002": "random", "055": "red", "056": "yellow", "057": "blue", "058": "green", "059": "orange", "060": "purple"}
const coloredCandy = {"002": "random", "018": "pepper_candy", "036": "frog", "045": "striped_horizontal", "046": "striped_vertical", "047": "wrapped", "049":"jellyfish", "051": "key", "052": "lucky", "032": "mystery", "033": "chameleon", "050": "extra_time_and_moves", "091": "jellyfish_striped", "092": "jellyfish_wrapped", "093": "jellyfish_colorbomb", "235": "cracked_candy", "084": "extra_moves_candy"}
const candy = {"044": "bomb", "043": "coconut_wheel", "061": "ufo"}
const sugarCoats = {"134": "sugarcoat_1", "135": "sugarcoat_2", "136": "sugarcoat_3"}
const locks = {"008": "licorice", "025": "marmalade", "038": "mulock1", "039": "mulock2", "040": "mulock3", "041": "mulock4", "042": "mulock5", "268": "vent_cotton"}
const glass = {"122": "glass_tile_1", "123": "glass_tile_2", "124": "glass_tile_3",}
const blockers={"007":"block_frosting","053":"chocolate_frog","009":"chocolate","017":"licorice_square","019":"block_multi_frosting1","020":"block_multi_frosting2","021":"block_multi_frosting3","022":"block_multi_frosting4","023":"block_multi_frosting5","024":"chocolate_spawner","035":"cake_bomb","054":"shell_1","062":"magic_mixer","066":"bobber","079":"block_waffle1","080":"block_waffle2","081":"block_waffle3","082":"block_waffle4","083":"block_waffle5","094":"dark_chocolate_1","095":"dark_chocolate_2","096":"dark_chocolate_3","097":"dark_chocolate_4","098":"dark_chocolate_5","129":"chain_layer1_c","130":"chain_layer2_c","131":"chain_layer3_c","132":"chain_layer4_c","133":"chain_layer5_c","157":"shell_3","158":"shell_2","159":"bubble_pop_1","160":"bubble_pop_2","161":"bubble_pop_3","162":"bubble_pop_4","163":"bubble_pop_5","211":"dark_chocolate_spawner_1","212":"dark_chocolate_spawner_2","213":"dark_chocolate_spawner_3","220":"jelly_jar_1","221":"jelly_jar_2","230":"gumball_machine","037":"toffee_tornado","070":"pinata","073":"pinata_crash","074":"pinata_link1","075":"pinata_link2","076":"pinata_link3","077":"pinata_unbreakable","078":"pinata_empty","156":"rainbow_rapid_mold","099":"crystallized_licorice","100":"adjecent_bobber","101":"mystery_blocker","102":"static_licorice_1","103":"static_licorice_2","104":"static_licorice_3","105":"static_licorice_4","106":"static_licorice_5","202":"layered_mystery_1","203":"layered_mystery_2","204":"layered_mystery_3","205":"blue_fizz_1","206":"blue_fizz_2","207":"blue_fizz_3","208":"blue_fizz_4","231":"summer_fizz_1","232":"summer_fizz_2","233":"summer_fizz_3","234":"summer_fizz_4","236":"block_multi_frosting6","237":"block_multi_frosting7","238":"block_multi_frosting8"};
const bonbon = {"182": "bonbon_colorbomb_1", "183": "bonbon_colorbomb_2", "184": "bonbon_colorbomb_3", "185": "bonbon_colorbomb_4", "186": "bonbon_horizontal_1", "187": 'bonbon_horizontal_2', "188": "bonbon_horizontal_3", "189": "bonbon_horizontal_4", "190": "bonbon_vertical_1", "191": "bonbon_vertical_2", "192": "bonbon_vertical_3", "193": "bonbon_vertical_4", "194": "bonbon_fish_1", "195": "bonbon_fish_2", "196": "bonbon_fish_3", "197": "bonbon_fish_4", "198": "bonbon_wrapped_1", "199": "bonbon_wrapped_2", "200": "bonbon_wrapped_3", "201": "bonbon_wrapped_4", "254": "bear1", "255": "bear2", "256": "bear3", "257": "bear4", "258": "bear5", "259": "bear6", "260": "empty_honey_1", "261": "empty_honey_2", "262": "empty_honey_3", "263": "empty_honey_4", "264": "empty_honey_5", "265": "empty_honey_6"}
const tiles = {"empty": "empty", "000": "none", "001": "grid", "003": "jelly", "004": "jelly2", "064": "blue_tile", "065": "black_tile", "209": "rock1", "210": "rock2", "266": "jelly3", "267": "jelly4"}
const ingredients = {"048": "cherry", "126": "hazelnut", "920": "butter"}
const walldown = {"087": "wall_down", "165": "licorice_wall_down", "110": "destructible_wall_1_down", "114": "destructible_wall_2_down", "118": "destructible_wall_3_down", "169": "destructible_wall_lic_1_down", "173": "destructible_wall_lic_2_down", "177": "destructible_wall_lic_3_down"}
const wallup = {"086": "wall_up", "164": "licorice_wall_up", "109": "destructible_wall_1_up", "113": "destructible_wall_2_up", "117": "destructible_wall_3_up", "168": "destructible_wall_lic_1_up", "172": "destructible_wall_lic_2_up", "176": "destructible_wall_lic_3_up"}
const wallright = {"089": "wall_right", "167": "licorice_wall_right", "112": "destructible_wall_1_right", "116": "destructible_wall_2_right", "120": "destructible_wall_3_right", "171": "destructible_wall_lic_1_right", "175": "destructible_wall_lic_2_right", "179": "destructible_wall_lic_3_right"}
const wallleft = {"088": "wall_left", "166": "licorice_wall_left", "111": "destructible_wall_1_left", "115": "destructible_wall_2_left", "119": "destructible_wall_3_left", "170": "destructible_wall_lic_1_left", "174": "destructible_wall_lic_2_left", "178": "destructible_wall_lic_3_left"}
const rainbowcannontop = {"152":"rainbow_rapid_cannon_top"}
const rainbowcannonbottom = {"153":"rainbow_rapid_cannon_bottom"}
const rainbowcannonleft = {"154":"rainbow_rapid_cannon_left"}   
const rainbowcannonright = {"155":"rainbow_rapid_cannon_right"}
const cannons = {"027": "cannon_ingredient", "028": "cannon_licorice", "029": "cannon_bomb", "030": "cannon_mulock_key", "031": "cannon_mystery", "067": "cannon_chameleon", "068": "cannon_lucky", "069": "cannon_extra_time_and_moves", "071": "cannon_striped_candy", "072": "cannon_wrapped_candy", "085": "cannon_extra_moves_candy", "107": "cannon_striped_horizontal", "108": "cannon_striped_vertical", "239": "cannon_cracked_candy", "127": "cannon_colorbomb", "128": "cannon_fish", "240": "cannon_wheel", "241": "cannon_ufo", "242": "cannon_sugar_drops"}
const path = {"140": "rainbow_stream_vertical", "141": "rainbow_stream_horizontal", "142": "rainbow_stream_BL", "143": "rainbow_stream_BR", "144": "rainbow_stream_TL", "145": "rainbow_stream_TR", "146": "rainbow_stream_TBL", "147": "rainbow_stream_TBR", "148": "rainbow_stream_TLR", "149": "rainbow_stream_BLR", "150": "rainbow_stream_all_directions", "151": "rainbow_stream_intersection_point"}
const leaflayer = {"063":'leaf'}
const indicators = {"994":'vertical_indicator',"995":'horizontal_indicator',"996":'left_indicator', "997":'up_indicator', "998":'down_indicator', "999":'right_indicator'}
const notes = {"006":'blocker_note', "":'rip_note'}
const entry_note = {"012":'portal_entry_note'}
const exit_note = {"013":'portal_exit_note'}

const portalentrance = {'990':'portal_entrance','014':'portal_entrance_hidden'}
const portalexit = {'991':'portal_exit','015':'portal_exit_hidden'}

const elements_ids = Object.assign({}, portalentrance, portalexit, rainbowcannontop, rainbowcannonbottom, rainbowcannonleft, rainbowcannonright, indicators, leaflayer,  colors, cannons, walldown, wallup, bonbon, path, wallright, wallleft, coloredCandy, candy, blockers, tiles, ingredients, sugarCoats, locks, glass, notes, entry_note, exit_note, {"010": "ingredients_exit", "026": "candy_entrance", "005": "candy_cannon"})
const elements_names = _.invert(elements_ids)

const stretched = ["009", "019", "020", "021", "022", "023", "025", "006", "123", "124", "134", "135", "136", "054", "157", "158", "024", "211", "212", "213", "220", "221", "159", "160", "161", "162", "163", "062"].concat(Object.keys(bonbon))
const small = [].concat(Object.keys(colors), Object.keys(coloredCandy), ["017", "002", "079", "080", "081", "082", "083", "044", "043", "125", "126"]);

const sugarCoatable = ["044", "017", "079", "080", "081", "082", "083", "125", "126", "043", "061"]

const elementsFolder = "elements/"
var selectedColor = "002"
var selectedElement = "002"
var elementLayer = "normal"

const orderItems = {"1": "red", "2": "blue", "3": "yellow", "4": "orange", "5": "purple", "6": "green", "7": "wrapped", "8": "striped", "9": "colorbomb", "10": "striped + striped", "11": "striped + wrapped", "12": "striped + colorbomb", "13": "colorbomb + colorbomb", "14": "wrapped + colorbomb", "15": "wrapped + wrapped", "16": "chocolate", "17": "frosting", "18": "popcorn", "19": "licorice", "20": "pepper bomb", "21": "jellyfish", "22": "cake bomb", "23": "mystery candy", "24": "magic mixer", "32": "bubblegum", "39": "gumballs", "40": "liquorice laces", "41": "single layered mystery blocker", "42": "layered mystery blocker", "43": "winter fizz", "44": "summer fizz", "45": "cracked candy", "46": "sugar drop", "47": "honey bear"}

const magicMixerItems = {"0": "All Blockers", "1":"pepper bomb", "2": "licorice", "3":"frosting (1 layer)", "4": "frosting (2 layers)", "5": "frosting (3 layers)", "6": "frosting (4 layers)", "7": "frosting (5 layers)", "74": "frosting (6 layers)", "75": "frosting (7 layers)", "76": "frosting (8 layers)", "8": "chocolate", "9": "licorice lock", "10": "marmalade", "30":"bubblegum pop (1 layer)", "31":"bubblegum pop (2 layer)", "32":"bubblegum pop (3 layers)", "33":"bubblegum pop (4 layers)", "34":"bubblegum pop (5 layers)", "55":"popcorn",    "60":"Liquorice Lace (1 Layered)", "61":"Liquorice Lace (2 Layered)", "62":"Liquorice Lace (3 Layered)", "63":"Liquorice Lace (4 Layered)", "64":"Liquorice Lace (5 Layered)", "65":"Winter Fizz (1 Layered)", "66":"Winter Fizz (2 Layered)", "67":"Winter Fizz (3 Layered)", "68":"Winter Fizz (4 Layered)", "69":"Summer Fizz (1 Layered)", "70":"Summer Fizz (2 Layered)", "71":"Summer Fizz (3 Layered)", "72":"Summer Fizz (4 Layered)", "73":"Cracked Candy"}

const cannonCodes = [["fallingIcing", "Level"], ["licorice"], ["luckyCandy"], ["mysteryCandy"], ["mulockCandy"], ["pepperCandy", "ExplosionTurns"], ["stripedCandy"], ["stripedRowCandy"], ["stripedColumnCandy"], ["timeCandy"], ["wrappedCandy"], ["extraMoves"], ["fish"], ["crackedCandy"], ["shield", "Level"], ["chameleonCandy"], ["colorBomb"], ["cocoWheel"], ["ufoCandy"], ["sugarDrop"]]

var currentMode = "Classic moves"

var lastPortalObject = undefined
var isPortalTimeout = false

export {
    // Game elements
    colors,
    coloredCandy,
    candy,
    sugarCoats,
    locks,
    glass,
    blockers,
    bonbon,
    tiles,
    ingredients,
    walldown,
    wallup,
    wallright,
    wallleft,
    rainbowcannontop,
    rainbowcannonbottom,
    rainbowcannonleft,
    rainbowcannonright,
    cannons,
    path,
    leaflayer,
    indicators,
    notes,
    entry_note,
    exit_note,
    portalentrance,
    portalexit,

    // Element collections and helpers
    elements_ids,
    elements_names,
    stretched,
    small,
    sugarCoatable,
    elementsFolder,

    // UI/Editor state
    selectedColor,
    selectedElement,
    elementLayer,

    // Miscellaneous
    orderItems,
    magicMixerItems,
    cannonCodes,
    currentMode,
    lastPortalObject,
    isPortalTimeout,
    layers,

    // Possibly undefined/optional exports
    layerElements,
    preferredColors,
    isDown
};