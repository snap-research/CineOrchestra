window.MANIFEST = {
  "title": "CineOrchestra: Unified Entity-Centric Conditioning for Cinematic Video Generation",
  "abstract": "Cinematic video depicts multiple subjects acting or interacting at specific moments, captured with deliberate camera movement, and stitched together by shot transitions. Together, these elements demand a level of fine-grained control beyond current text-to-video models. Existing work addresses each axis in isolation: multi-subject personalization, temporal control, multi-shot synthesis, or camera control; no prior framework jointly integrates all four. We present CineOrchestra, a unified video diffusion model that controls subjects, events, cameras, and shot transitions simultaneously. Our key insight is that these heterogeneous cinematic elements share a fundamental structure: each is an entity acting over a specific temporal interval, which can therefore all be expressed through one shared structure of entity-centric conditioning primitives, augmented with reference images for visual entities. This formulation reduces the architectural challenge to a single positional encoding problem, which we solve with two coordinated rotary embeddings: (i) an interval-sampled temporal RoPE that yields consistent attention behavior across events of dramatically varying duration, and (ii) a 2D entity-temporal cross-attention RoPE that disambiguates per-entity conditions and routes each to its corresponding spatiotemporal region. On two new benchmarks, CineOrchestra outperforms six per-axis specialists on dense caption following and shot-transition timing.",
  "authors": [],
  "entries": [
    {
      "seq": "01",
      "video": "data/01/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                7.412
              ],
              [
                7.918,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                0.503
              ],
              [
                2.918,
                2.91801
              ],
              [
                5.518,
                5.518009999999999
              ],
              [
                7.412,
                7.918
              ]
            ]
          },
          {
            "name": "{model_jolie}",
            "description": "{model_jolie} is a Senegalese woman in her early twenties with rich dark skin, a tightly braided crown of cornrows wrapped with gold thread, and high sharp cheekbones accented with metallic gold makeup. She wears a flowing architectural gown of pleated white silk and saffron-orange overlays, a wide gold collar necklace, and metallic gold platform sandals.",
            "time_intervals": [
              [
                0.503,
                7.412
              ],
              [
                7.918,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_runway}",
            "description": "{scene_runway} is a long mirrored white runway in a grand minimalist event hall, with a gleaming polished floor, spotlights pointing inward from above, a pulsing electronic backbeat, and a vast white backdrop at the far end emblazoned with the designer's logo in subtle silver foil.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} fades in from black to a wide static shot looking down the runway from the photographers' end.",
            "time_intervals": [
              0.0,
              0.503
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a slow fade-in from black to the runway.",
            "time_intervals": [
              0.0,
              0.503
            ]
          },
          {
            "name": "{scene_runway}",
            "description": "{scene_runway} surrounds the walk with mirrored gleam, beat pulsing, spotlights crisscrossing throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} holds the wide static as {model_jolie} steps onto the runway from the back.",
            "time_intervals": [
              0.503,
              2.918
            ]
          },
          {
            "name": "{model_jolie}",
            "description": "{model_jolie} steps onto the runway with a strong measured stride, chin lifted, gaze locked forward.",
            "time_intervals": [
              0.503,
              2.918
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the side-angle tracking shot.",
            "time_intervals": [
              2.918,
              2.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a low side-angle tracking shot moving with her as she walks.",
            "time_intervals": [
              2.918,
              5.518
            ]
          },
          {
            "name": "{model_jolie}",
            "description": "{model_jolie} walks past the camera in profile, the saffron silk swirling at her thighs.",
            "time_intervals": [
              2.918,
              5.518
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the close-up.",
            "time_intervals": [
              5.518,
              5.518009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up on her face from a low angle.",
            "time_intervals": [
              5.518,
              7.412
            ]
          },
          {
            "name": "{model_jolie}",
            "description": "{model_jolie}'s face fills the close-up, gold makeup catching the spotlights, expression severe.",
            "time_intervals": [
              5.518,
              7.412
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a half-second motion-blurred dissolve to the high overhead shot.",
            "time_intervals": [
              7.412,
              7.918
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} dissolves to a high overhead shot of her reaching the end of the runway and pivoting.",
            "time_intervals": [
              7.918,
              10.199999809265137
            ]
          },
          {
            "name": "{model_jolie}",
            "description": "{model_jolie} reaches the end of the runway and pivots sharply, gown flaring in a circle.",
            "time_intervals": [
              7.918,
              10.199999809265137
            ]
          }
        ],
        "summary": "On a long mirrored white runway in a grand minimalist event hall with gleaming polished floors, spotlights pointing in from above, a pulsing electronic backbeat, and a vast white backdrop bearing the designer's silver-foil logo at the far end, the camera fades in from black to a wide static down the runway from the photographers' end. A Senegalese model in her early twenties with rich dark skin, a tightly braided crown of cornrows wrapped with gold thread, sharp cheekbones accented with metallic gold makeup, a flowing architectural gown of pleated white silk and saffron-orange overlays, a wide gold collar necklace, and metallic gold platform sandals steps onto the runway with a strong measured stride past a rapt front row of editors and celebrities in dark sunglasses. After about three seconds a hard cut moves to a low side-angle tracking shot following her, the saffron silk swirling at her thighs, then a third hard cut to a tight low-angle close-up of her gold-painted severe face catching the spotlights, before a half-second motion-blurred dissolve moves to a high overhead shot as she reaches the end of the runway, pivots sharply with the gown flaring in a circle, and the photographers' pit explodes in rapid white flashes."
      },
      "refs": [
        {
          "src": "data/01/refs/00_model_jolie.jpg",
          "name": "{model_jolie}"
        }
      ],
      "desc": "Fashion runway walk"
    },
    {
      "seq": "02",
      "video": "data/02/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.418,
                2.41801
              ],
              [
                5.218,
                5.21801
              ],
              [
                7.5,
                7.501
              ],
              [
                8.318,
                8.31801
              ]
            ]
          },
          {
            "name": "{rocker_jax}",
            "description": "{rocker_jax} is a lanky white man in his late twenties with bleached platinum hair flying loose, sharp cheekbones, and silver hoop earrings. He wears a sleeveless black band t-shirt cut at the sides, ripped black jeans, a studded leather belt, and chunky black boots. A black-and-orange flame-painted Gibson Les Paul hangs low on a wide leather strap.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{stadium_crowd_rock}",
            "description": "{stadium_crowd_rock} is a sea of tens of thousands of fans pressed against the barricade, fists raised, faces lit by stage strobes, many holding glowing phones overhead.",
            "time_intervals": [
              [
                0.0,
                2.418
              ],
              [
                5.218,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{stage_pyro}",
            "description": "{stage_pyro} is a row of stage pyrotechnics jets along the front of the stage that shoot vertical pillars of orange flame.",
            "time_intervals": [
              [
                5.218,
                7.018
              ]
            ]
          },
          {
            "name": "{scene_stadium_stage}",
            "description": "{scene_stadium_stage} is a massive open-air stadium concert stage with towering stacks of black amplifiers, a giant LED video wall behind showing molten lava textures, swinging white spotlights, and red, blue, and white stage strobes.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} starts on a wide drone shot of {scene_stadium_stage} pulling toward {rocker_jax}.",
            "time_intervals": [
              0.0,
              2.418
            ]
          },
          {
            "name": "{rocker_jax}",
            "description": "{rocker_jax} struts toward the lip of the stage, head down, one hand sliding into a power chord.",
            "time_intervals": [
              0.0,
              2.418
            ]
          },
          {
            "name": "{stadium_crowd_rock}",
            "description": "{stadium_crowd_rock} screams and waves a sea of glowing phones at the wide pull-in.",
            "time_intervals": [
              0.0,
              2.418
            ]
          },
          {
            "name": "{scene_stadium_stage}",
            "description": "{scene_stadium_stage} surrounds the show with molten LED visuals, swinging spotlights, and amp stacks throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut into the hand close-up.",
            "time_intervals": [
              2.418,
              2.41801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a low-angle tight shot on {rocker_jax}'s hands shredding {flame_les_paul}.",
            "time_intervals": [
              2.418,
              5.218
            ]
          },
          {
            "name": "{rocker_jax}",
            "description": "{rocker_jax}'s left hand flies up and down the fretboard while his right hand picks frantically.",
            "time_intervals": [
              2.418,
              5.218
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the pyro wide.",
            "time_intervals": [
              5.218,
              5.21801
            ]
          },
          {
            "name": "{stage_pyro}",
            "description": "{stage_pyro} fires vertical pillars of orange flame across the front edge of the stage.",
            "time_intervals": [
              5.218,
              7.018
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a wide front shot of the stage as {stage_pyro} fires.",
            "time_intervals": [
              5.218,
              8.318
            ]
          },
          {
            "name": "{rocker_jax}",
            "description": "{rocker_jax} kicks one boot up onto the monitor and bends a sustained final note skyward.",
            "time_intervals": [
              5.218,
              8.318
            ]
          },
          {
            "name": "{stadium_crowd_rock}",
            "description": "{stadium_crowd_rock} roars as {stage_pyro} fires, hands flying up.",
            "time_intervals": [
              5.218,
              8.318
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the over-the-shoulder reverse.",
            "time_intervals": [
              8.318,
              8.31801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to an over-the-shoulder reverse from behind {rocker_jax} looking out at {stadium_crowd_rock}.",
            "time_intervals": [
              8.318,
              10.199999809265137
            ]
          },
          {
            "name": "{rocker_jax}",
            "description": "{rocker_jax} raises one fist toward {stadium_crowd_rock} and points the headstock out.",
            "time_intervals": [
              8.318,
              10.199999809265137
            ]
          },
          {
            "name": "{stadium_crowd_rock}",
            "description": "{stadium_crowd_rock} surges against the barricade, screaming back at {rocker_jax}.",
            "time_intervals": [
              8.318,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut",
            "time_intervals": [
              7.5,
              7.501
            ]
          }
        ],
        "summary": "On a massive open-air stadium concert stage with towering black amp stacks, a giant LED video wall flashing molten lava textures, swinging white spotlights, and red-blue-white strobes, a lanky white rock guitarist in his late twenties with bleached platinum hair flying loose, sharp cheekbones, silver hoop earrings, a sleeveless cut-up black band t-shirt, ripped black jeans, studded belt, and chunky boots \u2014 a flame-painted black Gibson Les Paul slung low \u2014 struts toward the lip of the stage, head down, sliding into a power chord. A hard cut at two and a half seconds drops to a low-angle tight shot of his hands shredding the fretboard. At five seconds another hard cut pulls back to a wide front of the stage as a row of pyrotechnic jets fires vertical orange flame pillars and he kicks one boot onto the monitor and bends a sustained skyward final note. A final hard cut at eight seconds reverses over his shoulder onto a sea of tens of thousands of fans pressed against the barricade, glowing phones aloft, surging and roaring as he points his headstock out at them."
      },
      "refs": [
        {
          "src": "data/02/refs/00_rocker_jax.jpg",
          "name": "{rocker_jax}"
        },
        {
          "src": "data/02/refs/01_stadium_crowd_rock.jpg",
          "name": "{stadium_crowd_rock}"
        },
        {
          "src": "data/02/refs/02_stage_pyro.jpg",
          "name": "{stage_pyro}"
        }
      ],
      "desc": "Stadium rock concert"
    },
    {
      "seq": "03",
      "video": "data/03/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                4.918
              ],
              [
                5.421,
                9.2
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.512,
                2.51201
              ],
              [
                4.918,
                5.421
              ],
              [
                8.118,
                8.11801
              ]
            ]
          },
          {
            "name": "{passenger_arjun}",
            "description": "{passenger_arjun} is an Indian man in his late twenties with thick black hair, a close-trimmed beard, and warm dark eyes. He wears round wire-rimmed glasses, a heather-gray crewneck sweater, dark olive trousers, and a cream-colored knitted scarf loosely draped around his neck. A small Moleskine notebook rests open on his lap.",
            "time_intervals": [
              [
                0.0,
                4.918
              ],
              [
                5.421,
                9.2
              ]
            ]
          },
          {
            "name": "{tea_glass}",
            "description": "{tea_glass} is a small glass cup of milky chai in a metal holder, sitting on the foldable train tray.",
            "time_intervals": [
              [
                0.0,
                2.512
              ],
              [
                8.118,
                9.2
              ]
            ]
          },
          {
            "name": "{passing_landscape}",
            "description": "{passing_landscape} is a sweeping countryside outside the window \u2014 green terraced rice fields, distant blue mountains, scattered red-roofed villages, a slow river winding alongside the tracks, and sudden bursts of deep yellow mustard fields in bloom.",
            "time_intervals": [
              [
                2.512,
                4.918
              ],
              [
                8.118,
                9.2
              ]
            ]
          },
          {
            "name": "{scene_train_compartment}",
            "description": "{scene_train_compartment} is a vintage second-class train compartment with a row of large rectangular windows along one side, padded green-and-tan striped bench seats, brass luggage racks above with carry-on bags, dim warm-yellow ceiling lamps, and the rhythmic clatter of wheels on track.",
            "time_intervals": [
              [
                0.0,
                9.2
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} is a static medium shot of {passenger_arjun} in profile, the window beside him.",
            "time_intervals": [
              0.0,
              2.512
            ]
          },
          {
            "name": "{passenger_arjun}",
            "description": "{passenger_arjun} gazes out the window, pen idle in his hand over the notebook.",
            "time_intervals": [
              0.0,
              2.512
            ]
          },
          {
            "name": "{tea_glass}",
            "description": "{tea_glass} sits on the foldable tray, ripples shivering across its surface from the train's motion.",
            "time_intervals": [
              0.0,
              2.512
            ]
          },
          {
            "name": "{scene_train_compartment}",
            "description": "{scene_train_compartment} surrounds the action throughout, dim lamps swaying with the rocking of the train.",
            "time_intervals": [
              0.0,
              9.2
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut from Arjun's profile to his window POV.",
            "time_intervals": [
              2.512,
              2.51201
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to {passenger_arjun}'s POV looking out the window, the landscape rushing past in horizontal blur.",
            "time_intervals": [
              2.512,
              4.918
            ]
          },
          {
            "name": "{passenger_arjun}",
            "description": "{passenger_arjun}'s breath fogs faintly on the glass as the landscape blurs past.",
            "time_intervals": [
              2.512,
              4.918
            ]
          },
          {
            "name": "{passing_landscape}",
            "description": "{passing_landscape} streaks past the window in the POV shot, mustard fields flashing yellow, then blue mountains, then the river.",
            "time_intervals": [
              2.512,
              4.918
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a half-second dissolve from the window POV to the close-up on his eyes.",
            "time_intervals": [
              4.918,
              5.421
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} dissolves to a tighter close-up on his eyes, reflections of the landscape swimming across his glasses.",
            "time_intervals": [
              5.421,
              8.118
            ]
          },
          {
            "name": "{passenger_arjun}",
            "description": "{passenger_arjun}'s eyes track the passing fields, glasses streaked with reflections, a soft smile forming.",
            "time_intervals": [
              5.421,
              8.118
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the high-angle wide of the compartment.",
            "time_intervals": [
              8.118,
              8.11801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a high-angle wide shot of the entire compartment as {passenger_arjun} closes his notebook.",
            "time_intervals": [
              8.118,
              9.2
            ]
          },
          {
            "name": "{passenger_arjun}",
            "description": "{passenger_arjun} closes the notebook on his lap and lifts {tea_glass} for a slow contemplative sip.",
            "time_intervals": [
              8.118,
              9.2
            ]
          },
          {
            "name": "{tea_glass}",
            "description": "{tea_glass} is lifted to {passenger_arjun}'s lips.",
            "time_intervals": [
              8.118,
              9.2
            ]
          },
          {
            "name": "{passing_landscape}",
            "description": "{passing_landscape} continues to flicker outside the window in the wider final shot.",
            "time_intervals": [
              8.118,
              9.2
            ]
          }
        ],
        "summary": "Inside a vintage second-class train compartment with a row of large rectangular windows along one side, padded green-and-tan striped bench seats, brass luggage racks above, dim warm-yellow ceiling lamps, and the rhythmic clatter of wheels on track, an Indian man in his late twenties with thick black hair, a close-trimmed beard, warm dark eyes, round wire-rimmed glasses, a heather-gray crewneck sweater, dark olive trousers, and a loose cream knitted scarf sits in profile with a small open Moleskine notebook on his lap and a tiny glass cup of milky chai in a metal holder on the foldable tray. A static medium of his profile holds for two and a half seconds, then hard-cuts to his POV out the window where green terraced rice fields, distant blue mountains, red-roofed villages, a winding river, and sudden bursts of yellow mustard fields blur past horizontally as his breath fogs the glass. A half-second dissolve at five seconds moves to a tighter close-up on his eyes with reflections of the landscape swimming across his glasses and a soft smile forming, before a hard cut to a high-angle wide shot of the compartment shows him closing his notebook and lifting the chai for a slow contemplative sip."
      },
      "refs": [
        {
          "src": "data/03/refs/00_passenger_arjun.jpg",
          "name": "{passenger_arjun}"
        },
        {
          "src": "data/03/refs/01_tea_glass.jpg",
          "name": "{tea_glass}"
        },
        {
          "src": "data/03/refs/02_passing_landscape.jpg",
          "name": "{passing_landscape}"
        }
      ],
      "duration": 9.2,
      "desc": "Train ride with tea"
    },
    {
      "seq": "04",
      "video": "data/04/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                2.918
              ],
              [
                3.421,
                5.412
              ],
              [
                5.913,
                8.018
              ],
              [
                8.521,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.918,
                3.421
              ],
              [
                5.412,
                5.913
              ],
              [
                8.018,
                8.521
              ]
            ]
          },
          {
            "name": "{interviewee_walter}",
            "description": "{interviewee_walter} is an elderly Black man in his early eighties with thinning white hair, a neatly trimmed white beard, and dark watery eyes. He wears a soft brown cardigan over a checked tan shirt and a blue tie, with a tiny veteran's pin on his lapel.",
            "time_intervals": [
              [
                0.0,
                2.918
              ],
              [
                5.913,
                8.018
              ]
            ]
          },
          {
            "name": "{archival_photo_1}",
            "description": "{archival_photo_1} is a sepia-toned 1940s photograph of a young soldier in army uniform standing in front of a military barracks, with handwritten 'SGT. W. ELLIS, 1944' in the white lower margin.",
            "time_intervals": [
              [
                3.421,
                5.412
              ]
            ]
          },
          {
            "name": "{archival_photo_2}",
            "description": "{archival_photo_2} is a black-and-white photograph of a small wedding party on the steps of a tiny stone church, the bride in a tea-length white dress and the groom in uniform smiling shyly.",
            "time_intervals": [
              [
                8.521,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_living_room_warm}",
            "description": "{scene_living_room_warm} is a warmly lit living room with floral wallpaper, a beige armchair, a small lamp on a side table, framed family photographs lining a wooden mantel, and a tall window letting in late-afternoon sunlight that streaks across the rug.",
            "time_intervals": [
              [
                0.0,
                2.918
              ],
              [
                5.913,
                8.018
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} is a static medium shot of {interviewee_walter} in his armchair, framed by the warm living room.",
            "time_intervals": [
              0.0,
              2.918
            ]
          },
          {
            "name": "{interviewee_walter}",
            "description": "{interviewee_walter} sits in his armchair speaking softly, hands folded in his lap, eyes glistening.",
            "time_intervals": [
              0.0,
              2.918
            ]
          },
          {
            "name": "{scene_living_room_warm}",
            "description": "{scene_living_room_warm} surrounds {interviewee_walter} during his on-camera segments.",
            "time_intervals": [
              0.0,
              2.918
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a slow cross-dissolve from {interviewee_walter} to {archival_photo_1}.",
            "time_intervals": [
              2.918,
              3.421
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} holds steady on {archival_photo_1}, with a slow Ken Burns push-in into its center.",
            "time_intervals": [
              3.421,
              5.412
            ]
          },
          {
            "name": "{archival_photo_1}",
            "description": "{archival_photo_1} is shown filling the frame with a slow push into the young soldier's face.",
            "time_intervals": [
              3.421,
              5.412
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a slow cross-dissolve from {archival_photo_1} back to {interviewee_walter}.",
            "time_intervals": [
              5.412,
              5.913
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} returns to the static medium shot of {interviewee_walter}, who continues to speak.",
            "time_intervals": [
              5.913,
              8.018
            ]
          },
          {
            "name": "{interviewee_walter}",
            "description": "{interviewee_walter} smiles faintly, his voice continuing in voiceover as the photo is shown.",
            "time_intervals": [
              5.913,
              8.018
            ]
          },
          {
            "name": "{scene_living_room_warm}",
            "description": "{scene_living_room_warm} is again the setting as {interviewee_walter} continues his recollection.",
            "time_intervals": [
              5.913,
              8.018
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a slow cross-dissolve from {interviewee_walter} to {archival_photo_2}.",
            "time_intervals": [
              8.018,
              8.521
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} holds steady on {archival_photo_2}, gently panning right across the wedding party.",
            "time_intervals": [
              8.521,
              10.199999809265137
            ]
          },
          {
            "name": "{archival_photo_2}",
            "description": "{archival_photo_2} fills the frame, the camera panning gently right across the wedding party.",
            "time_intervals": [
              8.521,
              10.199999809265137
            ]
          }
        ],
        "summary": "In a warmly lit living room with floral wallpaper, a beige armchair, a small side-table lamp, framed family photographs on a wooden mantel, and late-afternoon sunlight streaking across the rug, an elderly Black man in his early eighties with thinning white hair, a neatly trimmed white beard, dark watery eyes, a soft brown cardigan over a checked tan shirt and blue tie, and a tiny veteran's pin sits in his armchair speaking softly with hands folded, eyes glistening. After about three seconds the camera does a half-second slow cross-dissolve to a sepia-toned 1940s photograph of a young soldier in army uniform in front of a barracks, captioned 'SGT. W. ELLIS, 1944', and a slow Ken Burns push moves into his face while the elderly man's voice continues in voiceover. A second cross-dissolve returns to the medium of him in the armchair as he smiles faintly, then a third cross-dissolve at eight seconds moves to a black-and-white photograph of a small wedding party on the steps of a stone church, with the camera panning gently right across the bride in a tea-length white dress and the groom shyly smiling in uniform."
      },
      "refs": [
        {
          "src": "data/04/refs/00_interviewee_walter.jpg",
          "name": "{interviewee_walter}"
        },
        {
          "src": "data/04/refs/01_archival_photo_1.jpg",
          "name": "{archival_photo_1}"
        },
        {
          "src": "data/04/refs/02_archival_photo_2.jpg",
          "name": "{archival_photo_2}"
        }
      ],
      "desc": "Historian's interview"
    },
    {
      "seq": "05",
      "video": "data/05/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.812,
                3.81201
              ],
              [
                7.512,
                7.512009999999999
              ]
            ]
          },
          {
            "name": "{painter_isolde}",
            "description": "{painter_isolde} is a Scandinavian woman in her early sixties with chin-length white-blond hair tucked behind her ears, sun-spotted pale skin, and pale gray-blue eyes. She wears a paint-spattered loose denim shirt rolled to the elbows, faded khakis, leather sandals, and round wire-rimmed reading glasses pushed up on her head. Cobalt blue and ochre smears dot her left cheek.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{painting_canvas}",
            "description": "{painting_canvas} is a tall stretched canvas on a tripod easel, a half-finished oil painting depicting a turbulent stormy seascape with churning gray-green waves, a tilted blue fishing skiff, and a low mass of bruise-purple clouds.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{paint_palette}",
            "description": "{paint_palette} is a worn wooden hand-palette laden with thick blobs of titanium white, prussian blue, raw umber, ochre, and a streak of cadmium red, with two well-loved sable brushes laid across one edge.",
            "time_intervals": [
              [
                3.812,
                7.512
              ]
            ]
          },
          {
            "name": "{scene_attic_studio}",
            "description": "{scene_attic_studio} is a sun-drenched attic art studio with raw wood-beamed sloping ceilings, two large dormer windows opening onto a bright blue afternoon sky, scarred plank floors splattered with decades of dried paint, racks of canvases leaning against the walls, jars of brushes and turpentine on a battered side table, and motes of dust drifting through the slanted sunbeams.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} is a slow handheld push-in from behind {painter_isolde} toward {painting_canvas}.",
            "time_intervals": [
              0.0,
              3.812
            ]
          },
          {
            "name": "{painter_isolde}",
            "description": "{painter_isolde} dabs at {painting_canvas} with quick small strokes, brow furrowed in concentration.",
            "time_intervals": [
              0.0,
              3.812
            ]
          },
          {
            "name": "{painting_canvas}",
            "description": "{painting_canvas} sits on the easel with the half-finished seascape, fresh wet strokes glistening.",
            "time_intervals": [
              0.0,
              3.812
            ]
          },
          {
            "name": "{scene_attic_studio}",
            "description": "{scene_attic_studio} surrounds her with sloping wood beams, dust motes, and slanted afternoon sunlight throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the close-up of the palette.",
            "time_intervals": [
              3.812,
              3.81201
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up of {paint_palette} as her brush swirls together prussian blue and white.",
            "time_intervals": [
              3.812,
              7.512
            ]
          },
          {
            "name": "{painter_isolde}",
            "description": "{painter_isolde}'s hand swirls a brush through {paint_palette}, blending blue and white together.",
            "time_intervals": [
              3.812,
              7.512
            ]
          },
          {
            "name": "{painting_canvas}",
            "description": "{painting_canvas} is partly visible behind {paint_palette}, a corner of the storm clouds in focus.",
            "time_intervals": [
              3.812,
              7.512
            ]
          },
          {
            "name": "{paint_palette}",
            "description": "{paint_palette} rests on her thumb, mounded with paint and shifting in the close-up as she swirls a new color.",
            "time_intervals": [
              3.812,
              7.512
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the low side angle.",
            "time_intervals": [
              7.512,
              7.512009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a low side angle on {painter_isolde} stepping back from {painting_canvas}.",
            "time_intervals": [
              7.512,
              10.199999809265137
            ]
          },
          {
            "name": "{painter_isolde}",
            "description": "{painter_isolde} steps back a pace, tilting her head, brush hovering at her chin as she studies the work.",
            "time_intervals": [
              7.512,
              10.199999809265137
            ]
          },
          {
            "name": "{painting_canvas}",
            "description": "{painting_canvas} is fully visible in the side angle, a new luminous patch of stormy sky added to it.",
            "time_intervals": [
              7.512,
              10.199999809265137
            ]
          }
        ],
        "summary": "In a sun-drenched attic art studio with raw wood-beamed sloping ceilings, two large dormer windows opening onto a bright blue afternoon sky, scarred plank floors splattered with decades of dried paint, racks of canvases against the walls, jars of brushes and turpentine on a battered side table, and motes of dust drifting through slanted sunbeams, a Scandinavian woman in her early sixties with chin-length white-blond hair tucked behind her ears, sun-spotted skin, gray-blue eyes, a paint-spattered loose denim shirt rolled to the elbows, faded khakis, leather sandals, round wire glasses pushed up on her head, and cobalt-and-ochre smears on her left cheek dabs at a tall stretched canvas on a tripod easel \u2014 a half-finished oil seascape of churning gray-green waves, a tilted blue fishing skiff, and bruise-purple clouds \u2014 with quick small strokes. The slow handheld push-in from behind her holds for nearly four seconds, then hard-cuts to a tight close-up of her wooden hand-palette laden with titanium white, prussian blue, raw umber, ochre, and a streak of cadmium red as her brush swirls blue and white together, before a final hard cut to a low side angle shows her stepping back, tilting her head, brush at her chin as she studies a fresh luminous patch of stormy sky on the canvas."
      },
      "refs": [
        {
          "src": "data/05/refs/00_painter_isolde.jpg",
          "name": "{painter_isolde}"
        },
        {
          "src": "data/05/refs/01_painting_canvas.jpg",
          "name": "{painting_canvas}"
        },
        {
          "src": "data/05/refs/02_paint_palette.jpg",
          "name": "{paint_palette}"
        }
      ],
      "desc": "Attic studio painting"
    },
    {
      "seq": "06",
      "video": "data/06/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.418,
                2.41801
              ],
              [
                5.918,
                5.91801
              ],
              [
                8.218,
                8.21801
              ]
            ]
          },
          {
            "name": "{smith_torin}",
            "description": "{smith_torin} is a powerfully built Scottish man in his mid-forties with a thick auburn beard, sweat-dampened red hair tied back, deep-set blue eyes, and soot smudged across his face. He wears a heavy leather apron with brass buckles over a sleeveless gray shirt, scarred forearms covered in old burn marks, and thick leather gauntlets.",
            "time_intervals": [
              [
                0.0,
                8.218
              ]
            ]
          },
          {
            "name": "{glowing_blade}",
            "description": "{glowing_blade} is a long unfinished steel sword blade glowing bright cherry-red along its length, gripped in heavy iron tongs.",
            "time_intervals": [
              [
                2.418,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{forge_anvil}",
            "description": "{forge_anvil} is a massive black iron anvil set into a thick oak stump, its working surface scored and pitted from years of use.",
            "time_intervals": [
              [
                2.418,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{forge_fire}",
            "description": "{forge_fire} is the open mouth of a coal-fired forge in the background, glowing fierce orange and yellow, sparks drifting upward.",
            "time_intervals": [
              [
                0.0,
                8.218
              ]
            ]
          },
          {
            "name": "{scene_forge_workshop}",
            "description": "{scene_forge_workshop} is a dim stone-walled workshop with rough-hewn timber rafters, hanging tools (tongs, hammers, files) silhouetted on the walls, a dusty leaded window letting in a single shaft of pale daylight, and a heavy wooden door open to a green countryside.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} is a tight close-up on {smith_torin}'s face, his eyes focused, lit warm orange by {forge_fire}.",
            "time_intervals": [
              0.0,
              2.418
            ]
          },
          {
            "name": "{smith_torin}",
            "description": "{smith_torin} stares ahead with quiet intensity, raising a heavy hammer just out of frame.",
            "time_intervals": [
              0.0,
              2.418
            ]
          },
          {
            "name": "{forge_fire}",
            "description": "{forge_fire} burns fiercely in the background, casting flickering orange light.",
            "time_intervals": [
              0.0,
              8.218
            ]
          },
          {
            "name": "{scene_forge_workshop}",
            "description": "{scene_forge_workshop} surrounds the action with stone walls and a single shaft of pale daylight.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the top-down on the anvil.",
            "time_intervals": [
              2.418,
              2.41801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a top-down close-up on {forge_anvil}, {glowing_blade} resting on its surface.",
            "time_intervals": [
              2.418,
              5.918
            ]
          },
          {
            "name": "{smith_torin}",
            "description": "{smith_torin}'s gauntleted hand brings {glowing_blade} from {forge_fire} to {forge_anvil}, then lifts a hammer.",
            "time_intervals": [
              2.418,
              5.918
            ]
          },
          {
            "name": "{glowing_blade}",
            "description": "{glowing_blade} is laid flat across {forge_anvil}, glowing intensely.",
            "time_intervals": [
              2.418,
              5.918
            ]
          },
          {
            "name": "{forge_anvil}",
            "description": "{forge_anvil} sits centered in the workshop, a curl of smoke drifting off its surface.",
            "time_intervals": [
              2.418,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the wide of the workshop.",
            "time_intervals": [
              5.918,
              5.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a wide medium shot of the workshop with {smith_torin} striking the blade.",
            "time_intervals": [
              5.918,
              8.218
            ]
          },
          {
            "name": "{smith_torin}",
            "description": "{smith_torin} hammers {glowing_blade} with rhythmic strikes, sparks scattering at each blow.",
            "time_intervals": [
              5.918,
              8.218
            ]
          },
          {
            "name": "{glowing_blade}",
            "description": "{glowing_blade} flexes and rings under each strike, color paling slightly.",
            "time_intervals": [
              5.918,
              8.218
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the slow-motion strike.",
            "time_intervals": [
              8.218,
              8.21801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a slow-motion extreme close-up on a single hammer strike, sparks flying off the steel.",
            "time_intervals": [
              8.218,
              10.199999809265137
            ]
          },
          {
            "name": "{glowing_blade}",
            "description": "{glowing_blade} fills the slow-motion frame as the hammer strikes it, sparks bursting outward in a fan.",
            "time_intervals": [
              8.218,
              10.199999809265137
            ]
          }
        ],
        "summary": "In a dim stone-walled blacksmith's workshop with rough-hewn timber rafters, hanging silhouetted tongs and hammers, a dusty leaded window letting in a single shaft of pale daylight, and a heavy wooden door open to a green countryside, a powerfully built Scottish smith in his mid-forties with a thick auburn beard, sweat-dampened red hair tied back, deep-set blue eyes, soot-smudged face, a brass-buckled heavy leather apron over a sleeveless gray shirt, burn-scarred forearms, and thick leather gauntlets stares ahead with quiet intensity, lit warm orange by a coal forge in the background. A tight close-up of his face holds for two and a half seconds, then hard-cuts to a top-down close-up of a massive black anvil set into an oak stump as his gauntleted hand lays a long unfinished cherry-red glowing sword blade flat across it and lifts a hammer. A third hard cut moves to a wide medium of the workshop as he strikes the blade rhythmically with sparks scattering, and a final hard cut to a slow-motion extreme close-up shows a single hammer strike on the steel sending sparks bursting outward in a fan."
      },
      "refs": [
        {
          "src": "data/06/refs/00_smith_torin.jpg",
          "name": "{smith_torin}"
        },
        {
          "src": "data/06/refs/01_glowing_blade.jpg",
          "name": "{glowing_blade}"
        },
        {
          "src": "data/06/refs/02_forge_anvil.jpg",
          "name": "{forge_anvil}"
        },
        {
          "src": "data/06/refs/03_forge_fire.jpg",
          "name": "{forge_fire}"
        }
      ],
      "desc": "Blacksmith forging"
    },
    {
      "seq": "07",
      "video": "data/07/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                4.518,
                4.518009999999999
              ]
            ]
          },
          {
            "name": "{watchmaker_pieter}",
            "description": "{watchmaker_pieter} is a Dutch watchmaker in his sixties with neat thinning gray hair, a clean shave, soft hazel eyes magnified by a black loupe over his right eye, and weathered hands. He wears a beige knit cardigan over a white shirt, a brown bow tie, and a dark green vinyl apron.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{watch_movement}",
            "description": "{watch_movement} is a tiny brass-and-silver mechanical watch movement with exposed gears and a balance wheel slowly oscillating.",
            "time_intervals": [
              [
                4.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{tweezers}",
            "description": "{tweezers} is a pair of fine brass watchmaker's tweezers held in his right hand.",
            "time_intervals": [
              [
                4.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{lupe_eyepiece}",
            "description": "{lupe_eyepiece} is a black loupe magnifier mounted over his right eye, increasing its visual size.",
            "time_intervals": [
              [
                0.0,
                4.518
              ]
            ]
          },
          {
            "name": "{scene_watch_workshop}",
            "description": "{scene_watch_workshop} is a tiny watchmaker's workshop in Amsterdam \u2014 a worn dark-wood workbench with a small green felt mat, glass-fronted display cases lining the walls full of antique watches, a single bright work-lamp casting a tight pool of light, dust-free order, and the soft tick of a wall clock in the background.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a tight close-up of {watchmaker_pieter}'s loupe-magnified eye over {watch_movement}.",
            "time_intervals": [
              0.0,
              4.518
            ]
          },
          {
            "name": "{watchmaker_pieter}",
            "description": "{watchmaker_pieter} bends over the bench, breath held, loupe magnifying his eye.",
            "time_intervals": [
              0.0,
              4.518
            ]
          },
          {
            "name": "{lupe_eyepiece}",
            "description": "{lupe_eyepiece} magnifies his eye throughout.",
            "time_intervals": [
              0.0,
              4.518
            ]
          },
          {
            "name": "{scene_watch_workshop}",
            "description": "{scene_watch_workshop} surrounds the workbench in a tight pool of warm lamplight throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the tweezers macro.",
            "time_intervals": [
              4.518,
              4.518009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to an extreme macro top-down of {tweezers} placing a tiny screw on the movement.",
            "time_intervals": [
              4.518,
              10.199999809265137
            ]
          },
          {
            "name": "{watchmaker_pieter}",
            "description": "{watchmaker_pieter}'s tweezers carefully set a tiny screw on the movement, fingers steady.",
            "time_intervals": [
              4.518,
              10.199999809265137
            ]
          },
          {
            "name": "{watch_movement}",
            "description": "{watch_movement} is centered on the green felt mat, gears glinting.",
            "time_intervals": [
              4.518,
              10.199999809265137
            ]
          },
          {
            "name": "{tweezers}",
            "description": "{tweezers} grip a tiny screw with surgical precision.",
            "time_intervals": [
              4.518,
              10.199999809265137
            ]
          }
        ],
        "summary": "Inside a tiny watchmaker's workshop in Amsterdam \u2014 a worn dark-wood workbench with a small green felt mat, glass-fronted display cases lining the walls full of antique watches, a single bright work-lamp casting a tight pool of light, dust-free order, and the soft tick of a wall clock in the background \u2014 a Dutch watchmaker in his sixties with neat thinning gray hair, clean shave, soft hazel eyes magnified by a black loupe over his right eye, and weathered hands wears a beige knit cardigan over a white shirt, brown bow tie, and dark green vinyl apron, bent over the bench with breath held over a tiny brass-and-silver mechanical watch movement whose exposed gears and balance wheel slowly oscillate. A pair of fine brass watchmaker's tweezers grips a tiny screw with surgical precision. The camera opens on a tight close-up of his loupe-magnified eye. A hard cut at four and a half seconds tightens to an extreme macro top-down of his tweezers carefully setting the screw onto the movement, fingers steady."
      },
      "refs": [
        {
          "src": "data/07/refs/00_watchmaker_pieter.jpg",
          "name": "{watchmaker_pieter}"
        },
        {
          "src": "data/07/refs/01_watch_movement.jpg",
          "name": "{watch_movement}"
        },
        {
          "src": "data/07/refs/02_tweezers.jpg",
          "name": "{tweezers}"
        },
        {
          "src": "data/07/refs/03_lupe_eyepiece.jpg",
          "name": "{lupe_eyepiece}"
        }
      ],
      "desc": "Watchmaker at work"
    },
    {
      "seq": "08",
      "video": "data/08/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.918,
                3.91801
              ],
              [
                7.018,
                7.018009999999999
              ]
            ]
          },
          {
            "name": "{photographer_chloe}",
            "description": "{photographer_chloe} is a French photographer in her early thirties with chestnut waves tucked under a knit cap, freckled cheeks, and bright eyes. She wears a tan canvas jacket, a knit gray scarf, dark slim jeans, brown leather boots, and a vintage film camera on a leather strap.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{venice_gondola}",
            "description": "{venice_gondola} is a sleek black Venetian gondola gliding past her, the gondolier in a striped shirt and straw hat poling.",
            "time_intervals": [
              [
                0.0,
                3.918
              ],
              [
                7.018,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{film_camera}",
            "description": "{film_camera} is a vintage Leica film camera held to her eye.",
            "time_intervals": [
              [
                0.0,
                7.018
              ]
            ]
          },
          {
            "name": "{scene_venice_canal}",
            "description": "{scene_venice_canal} is a narrow Venetian side canal at sunset \u2014 pastel-stuccoed Renaissance buildings reflected in the water, draped laundry on lines between balconies, weathered wooden boat-tying poles, and amber-pink sunset light.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide of {photographer_chloe} on a small bridge.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{photographer_chloe}",
            "description": "{photographer_chloe} leans over the bridge railing, eye to her viewfinder.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{venice_gondola}",
            "description": "{venice_gondola} glides slowly through the canal throughout.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{film_camera}",
            "description": "{film_camera} clicks crisply at her eye.",
            "time_intervals": [
              0.0,
              7.018
            ]
          },
          {
            "name": "{scene_venice_canal}",
            "description": "{scene_venice_canal} bathes the canal in amber-pink sunset throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the camera.",
            "time_intervals": [
              3.918,
              3.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up of {film_camera} held to her eye and the shutter clicking.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{photographer_chloe}",
            "description": "{photographer_chloe} clicks the shutter, advances the film with her thumb.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the gondola.",
            "time_intervals": [
              7.018,
              7.018009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a medium of {venice_gondola} gliding past below.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{photographer_chloe}",
            "description": "{photographer_chloe} lowers the camera and smiles, watching the gondola pass.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{venice_gondola}",
            "description": "{venice_gondola} glides slowly through the canal throughout.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          }
        ],
        "summary": "On a narrow Venetian side canal at sunset with pastel-stuccoed Renaissance buildings reflected in the water, draped laundry on lines between balconies, weathered wooden boat-tying poles, and amber-pink sunset light, a French photographer in her early thirties with chestnut waves tucked under a knit cap, freckled cheeks, bright eyes, tan canvas jacket, knit gray scarf, dark slim jeans, brown leather boots, and a vintage film camera on a leather strap leans over a small bridge with her vintage Leica held to her eye while a sleek black Venetian gondola with a striped-shirted, straw-hatted gondolier glides past below. The camera opens on a wide. A hard cut at four seconds tightens to a close-up of the camera at her eye and the shutter clicking. A final hard cut at seven seconds tightens to a medium of the gondola gliding past below."
      },
      "refs": [
        {
          "src": "data/08/refs/00_photographer_chloe.jpg",
          "name": "{photographer_chloe}"
        },
        {
          "src": "data/08/refs/01_venice_gondola.jpg",
          "name": "{venice_gondola}"
        },
        {
          "src": "data/08/refs/02_film_camera.jpg",
          "name": "{film_camera}"
        }
      ],
      "desc": "Venice photography"
    },
    {
      "seq": "09",
      "video": "data/09/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.918,
                3.91801
              ],
              [
                7.018,
                7.018009999999999
              ],
              [
                8.518,
                8.51801
              ]
            ]
          },
          {
            "name": "{gunslinger_jed}",
            "description": "{gunslinger_jed} is a weathered white gunslinger in his forties with sun-bleached chestnut hair under a battered black Stetson, a thick mustache, three days' stubble, and squinting blue eyes. He wears a long brown duster, a faded black vest, a star-shaped tin sheriff's badge, dark trousers tucked into worn leather boots, and a Colt Peacemaker on his right hip.",
            "time_intervals": [
              [
                0.0,
                7.018
              ],
              [
                8.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{outlaw_silas}",
            "description": "{outlaw_silas} is a thin Mexican-American outlaw in his thirties with a black sombrero pushed back, a thin scar across his cheek, and a grim half-smile. He wears a black leather vest over a faded red shirt, a red bandana around his neck, dark pants, spurred boots, and a pistol at his hip.",
            "time_intervals": [
              [
                0.0,
                3.918
              ],
              [
                7.018,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{water_trough}",
            "description": "{water_trough} is a rusted tin water trough at the side of the street with a few horse hairs floating on the surface.",
            "time_intervals": [
              [
                0.0,
                3.918
              ],
              [
                8.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_western_main_street}",
            "description": "{scene_western_main_street} is a dusty wide main street of a small late-1800s Texas town at sundown \u2014 wooden boardwalks on both sides, a saloon with batwing doors and 'WHISKEY' painted in white, a hitching post with two horses, a clapboard hotel, swinging signs, and a fiery red sun setting behind the rooftops.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide low-angle of {gunslinger_jed} and {outlaw_silas} squared off down the street.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{gunslinger_jed}",
            "description": "{gunslinger_jed} stands at one end of the street, duster catching the wind, hand hovering near his Colt.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{outlaw_silas}",
            "description": "{outlaw_silas} stands at the other end of the street, vest flapping in the breeze.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{water_trough}",
            "description": "{water_trough} sits at the side of the street with horse hairs floating throughout.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{scene_western_main_street}",
            "description": "{scene_western_main_street} bathes the duel in fiery red sundown and dust haze throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to {gunslinger_jed}'s eyes.",
            "time_intervals": [
              3.918,
              3.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up on {gunslinger_jed}'s eyes squinting at the setting sun.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{gunslinger_jed}",
            "description": "{gunslinger_jed}'s eyes narrow against the sun in extreme close-up.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to {outlaw_silas}'s eyes.",
            "time_intervals": [
              7.018,
              7.018009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up on {outlaw_silas}'s eyes narrowing.",
            "time_intervals": [
              7.018,
              8.518
            ]
          },
          {
            "name": "{outlaw_silas}",
            "description": "{outlaw_silas}'s eyes narrow under the sombrero in extreme close-up.",
            "time_intervals": [
              7.018,
              8.518
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the draw side wide.",
            "time_intervals": [
              8.518,
              8.51801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a side wide as both men draw and fire in a flash.",
            "time_intervals": [
              8.518,
              10.199999809265137
            ]
          },
          {
            "name": "{gunslinger_jed}",
            "description": "{gunslinger_jed} draws and fires in a blur, smoke curling from his Colt.",
            "time_intervals": [
              8.518,
              10.199999809265137
            ]
          },
          {
            "name": "{outlaw_silas}",
            "description": "{outlaw_silas} reaches and fires too, but a hair too late, staggering back.",
            "time_intervals": [
              8.518,
              10.199999809265137
            ]
          },
          {
            "name": "{water_trough}",
            "description": "{water_trough} sits at the side of the street with horse hairs floating throughout.",
            "time_intervals": [
              8.518,
              10.199999809265137
            ]
          }
        ],
        "summary": "On the dusty wide main street of a small late-1800s Texas town at sundown \u2014 wooden boardwalks on both sides, a saloon with batwing doors and 'WHISKEY' painted white, a hitching post with two horses, a clapboard hotel, swinging signs, and a fiery red sun setting behind the rooftops, with a rusted tin water trough at the side and a brown tumbleweed rolling across \u2014 a weathered white gunslinger in his forties with sun-bleached chestnut hair under a battered black Stetson, thick mustache, stubble, squinting blue eyes, long brown duster, faded black vest, tin sheriff's badge, dark trousers tucked into worn boots, and a Colt Peacemaker stands at one end facing a thin Mexican-American outlaw in his thirties \u2014 pushed-back black sombrero, scarred cheek, grim half-smile, black vest over a faded red shirt, red bandana, dark pants, spurred boots, hip pistol \u2014 at the other. The camera opens on a low-angle wide. A hard cut at four seconds tightens to the gunslinger's squinting eyes. Another hard cut at seven seconds tightens to the outlaw's narrowing eyes. A final hard cut at eight and a half seconds widens to the side as both draw and fire in a blur, smoke curling from the gunslinger's Colt and the outlaw staggering back."
      },
      "refs": [
        {
          "src": "data/09/refs/00_gunslinger_jed.jpg",
          "name": "{gunslinger_jed}"
        },
        {
          "src": "data/09/refs/01_outlaw_silas.jpg",
          "name": "{outlaw_silas}"
        },
        {
          "src": "data/09/refs/02_water_trough.jpg",
          "name": "{water_trough}"
        }
      ],
      "desc": "Wild West standoff"
    },
    {
      "seq": "10",
      "video": "data/10/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.218,
                3.21801
              ],
              [
                6.518,
                6.518009999999999
              ]
            ]
          },
          {
            "name": "{comedian_marcus}",
            "description": "{comedian_marcus} is a Black man in his mid-thirties with a clean fade haircut, neatly trimmed beard, and warm brown eyes. He wears a fitted maroon button-down shirt with the top two buttons open, dark jeans, and white sneakers. A wireless microphone is held loosely in his right hand.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{comedy_audience}",
            "description": "{comedy_audience} is a packed comedy-club audience seated at small round wooden tables with low candle lamps casting orange pools of light, half-finished cocktails, and a mix of young couples and groups of friends.",
            "time_intervals": [
              [
                6.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{wireless_mic}",
            "description": "{wireless_mic} is a black handheld wireless microphone with a small red LED on its base.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_comedy_club}",
            "description": "{scene_comedy_club} is the basement-level Comedy Cellar \u2014 exposed red-brick walls, a low ceiling, a small black-painted stage with a single stool and a tall metal mic stand, a deep red velvet curtain backdrop, and a wash of warm amber spotlight from the back of the room.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} holds a centered medium shot on {comedian_marcus} from front-of-stage as he sets up the bit.",
            "time_intervals": [
              0.0,
              3.218
            ]
          },
          {
            "name": "{comedian_marcus}",
            "description": "{comedian_marcus} paces casually two steps to his right, mic in hand, half-grinning as he sets up the joke.",
            "time_intervals": [
              0.0,
              3.218
            ]
          },
          {
            "name": "{wireless_mic}",
            "description": "{wireless_mic} is held casually at chest height by {comedian_marcus}.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_comedy_club}",
            "description": "{scene_comedy_club} surrounds the stage with red-brick walls and amber spotlight throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the punchline close-up.",
            "time_intervals": [
              3.218,
              3.21801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up on {comedian_marcus}'s face as he delivers the punchline.",
            "time_intervals": [
              3.218,
              6.518
            ]
          },
          {
            "name": "{comedian_marcus}",
            "description": "{comedian_marcus} stops dead-center, raises his eyebrows, drops his voice, and lands the punchline.",
            "time_intervals": [
              3.218,
              6.518
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the audience reverse.",
            "time_intervals": [
              6.518,
              6.518009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a wide reverse over {comedian_marcus}'s shoulder of {comedy_audience} laughing.",
            "time_intervals": [
              6.518,
              10.199999809265137
            ]
          },
          {
            "name": "{comedian_marcus}",
            "description": "{comedian_marcus} grins and shakes his head, mock-surprised at the laughter.",
            "time_intervals": [
              6.518,
              10.199999809265137
            ]
          },
          {
            "name": "{comedy_audience}",
            "description": "{comedy_audience} bursts into uproarious laughter, several patrons doubling over, one woman wiping a tear.",
            "time_intervals": [
              6.518,
              10.199999809265137
            ]
          }
        ],
        "summary": "Inside a basement-level Comedy Cellar with exposed red-brick walls, a small black-painted stage backed by a deep red velvet curtain, a single stool and metal mic stand, and small round wooden tables ringed with low candle lamps under warm amber spotlight, a Black man in his mid-thirties with a clean fade, trimmed beard, and warm brown eyes \u2014 wearing a fitted maroon button-down with the top two buttons open, dark jeans, and white sneakers \u2014 paces two steps right of center holding a black wireless microphone with a small red LED, half-grinning as he sets up a joke. The camera holds a centered medium shot for the first three seconds, then hard-cuts to a tight close-up on his face as he stops dead-center, raises his eyebrows, drops his voice, and lands the punchline. A second hard cut at six and a half seconds reveals a wide reverse over his shoulder of the packed audience at small candle-lit tables bursting into uproarious laughter \u2014 couples doubling over, one woman wiping a tear \u2014 while he grins and shakes his head in mock surprise."
      },
      "refs": [
        {
          "src": "data/10/refs/00_comedian_marcus.jpg",
          "name": "{comedian_marcus}"
        },
        {
          "src": "data/10/refs/01_comedy_audience.jpg",
          "name": "{comedy_audience}"
        },
        {
          "src": "data/10/refs/02_wireless_mic.jpg",
          "name": "{wireless_mic}"
        }
      ],
      "desc": "Stand-up comedy"
    },
    {
      "seq": "11",
      "video": "data/11/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.418,
                3.41801
              ],
              [
                6.918,
                6.91801
              ]
            ]
          },
          {
            "name": "{honeybee}",
            "description": "{honeybee} is a fuzzy yellow-and-black-striped honeybee with translucent wings beating rapidly and pollen baskets on her hind legs golden with collected pollen.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{lavender_flowers}",
            "description": "{lavender_flowers} are tall purple lavender stalks heavy with small fragrant flowers, swaying gently.",
            "time_intervals": [
              [
                0.0,
                6.918
              ]
            ]
          },
          {
            "name": "{sunflower_yellow}",
            "description": "{sunflower_yellow} is a single tall sunflower with a deep brown center disk and bright yellow petals, the bee landing on it.",
            "time_intervals": [
              [
                6.918,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_summer_flower_field}",
            "description": "{scene_summer_flower_field} is a sunny summer flower field \u2014 rows of purple lavender and yellow sunflowers under a clear blue sky, distant green hills, soft warm breeze, and golden afternoon light.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide aerial of the flower field with the bee a small dot.",
            "time_intervals": [
              0.0,
              3.418
            ]
          },
          {
            "name": "{honeybee}",
            "description": "{honeybee} darts through the field as a small blur in the wide.",
            "time_intervals": [
              0.0,
              3.418
            ]
          },
          {
            "name": "{lavender_flowers}",
            "description": "{lavender_flowers} sway gently under the bee's weight.",
            "time_intervals": [
              0.0,
              6.918
            ]
          },
          {
            "name": "{scene_summer_flower_field}",
            "description": "{scene_summer_flower_field} surrounds the macro with golden afternoon light throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the macro hover.",
            "time_intervals": [
              3.418,
              3.41801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to an extreme macro tracking shot of {honeybee} hovering at {lavender_flowers}.",
            "time_intervals": [
              3.418,
              6.918
            ]
          },
          {
            "name": "{honeybee}",
            "description": "{honeybee} hovers in macro over {lavender_flowers}, wings beating in a translucent blur.",
            "time_intervals": [
              3.418,
              6.918
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the sunflower landing.",
            "time_intervals": [
              6.918,
              6.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a macro slow-motion close-up as {honeybee} lands on {sunflower_yellow}'s center.",
            "time_intervals": [
              6.918,
              10.199999809265137
            ]
          },
          {
            "name": "{honeybee}",
            "description": "{honeybee} lands gently on {sunflower_yellow}, antennae twitching in slow motion.",
            "time_intervals": [
              6.918,
              10.199999809265137
            ]
          },
          {
            "name": "{sunflower_yellow}",
            "description": "{sunflower_yellow} stands tall with a deep brown center as the bee lands.",
            "time_intervals": [
              6.918,
              10.199999809265137
            ]
          }
        ],
        "summary": "Across a sunny summer flower field \u2014 rows of purple lavender and yellow sunflowers under a clear blue sky, distant green hills, soft warm breeze, and golden afternoon light \u2014 a fuzzy yellow-and-black-striped honeybee with translucent wings beating rapidly and pollen baskets on her hind legs golden with collected pollen darts. The camera opens on a wide aerial of the field with the bee as a small dot. A hard cut at three and a half seconds drops to an extreme macro tracking shot of her hovering at lavender stalks heavy with fragrant purple flowers, wings beating in a translucent blur. A final hard cut at seven seconds tightens to a macro slow-motion close-up as she lands gently on the deep-brown center disk of a tall sunflower with bright yellow petals, antennae twitching."
      },
      "refs": [
        {
          "src": "data/11/refs/00_honeybee.jpg",
          "name": "{honeybee}"
        },
        {
          "src": "data/11/refs/01_lavender_flowers.jpg",
          "name": "{lavender_flowers}"
        },
        {
          "src": "data/11/refs/02_sunflower_yellow.jpg",
          "name": "{sunflower_yellow}"
        }
      ],
      "desc": "Bees in flower field"
    },
    {
      "seq": "12",
      "video": "data/12/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.918,
                3.91801
              ],
              [
                7.518,
                7.518009999999999
              ]
            ]
          },
          {
            "name": "{hummingbird}",
            "description": "{hummingbird} is a tiny ruby-throated hummingbird with iridescent emerald-green back, brilliant red throat patch, white breast, and wings beating in a translucent blur.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{hummingbird_feeder}",
            "description": "{hummingbird_feeder} is a glass-globe red hummingbird feeder with four yellow flower-shaped feeding ports, half-full of clear sugar water, hanging from a brass hook.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{rose_bush_pink}",
            "description": "{rose_bush_pink} is a leafy rose bush with bright pink heirloom blooms beside the feeder.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_back_porch}",
            "description": "{scene_back_porch} is a covered cedar back porch with a hanging swing, two wicker chairs, the feeder on a hook, terracotta planters along the railing, and the soft sound of cicadas in the distance.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a slow push-in on {hummingbird_feeder} hanging from the hook.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{hummingbird}",
            "description": "{hummingbird} darts into frame and zips around the feeder.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{hummingbird_feeder}",
            "description": "{hummingbird_feeder} sways gently throughout, ports glistening.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{rose_bush_pink}",
            "description": "{rose_bush_pink} stands beside the feeder with pink blooms throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_back_porch}",
            "description": "{scene_back_porch} surrounds the scene with cicada hum and porch quiet throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the hovering close-up.",
            "time_intervals": [
              3.918,
              3.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a macro slow-motion close-up of {hummingbird} hovering at one port.",
            "time_intervals": [
              3.918,
              7.518
            ]
          },
          {
            "name": "{hummingbird}",
            "description": "{hummingbird} hovers at one port, beak dipping in to feed in slow motion.",
            "time_intervals": [
              3.918,
              7.518
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the throat shimmer.",
            "time_intervals": [
              7.518,
              7.518009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up of its iridescent throat catching the sun.",
            "time_intervals": [
              7.518,
              10.199999809265137
            ]
          },
          {
            "name": "{hummingbird}",
            "description": "{hummingbird}'s ruby throat catches the sun, flashing brilliantly.",
            "time_intervals": [
              7.518,
              10.199999809265137
            ]
          }
        ],
        "summary": "On a covered cedar back porch \u2014 a hanging swing, two wicker chairs, terracotta planters along the railing, distant cicada hum, a leafy rose bush of bright pink heirloom blooms beside the feeder, and a glass-globe red hummingbird feeder with four yellow flower-shaped feeding ports half-full of clear sugar water hanging from a brass hook \u2014 a tiny ruby-throated hummingbird with iridescent emerald-green back, brilliant red throat patch, white breast, and wings beating in a translucent blur darts in. The camera opens on a slow push-in on the feeder. A hard cut at four seconds drops to a macro slow-motion close-up as he hovers at one port, beak dipping in to feed. A final hard cut at seven and a half seconds tightens to his iridescent throat catching the sun and flashing brilliantly."
      },
      "refs": [
        {
          "src": "data/12/refs/00_hummingbird.jpg",
          "name": "{hummingbird}"
        },
        {
          "src": "data/12/refs/01_hummingbird_feeder.jpg",
          "name": "{hummingbird_feeder}"
        },
        {
          "src": "data/12/refs/02_rose_bush_pink.jpg",
          "name": "{rose_bush_pink}"
        }
      ],
      "desc": "Hummingbird at feeder"
    },
    {
      "seq": "13",
      "video": "data/13/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.918,
                3.91801
              ],
              [
                7.018,
                7.018009999999999
              ]
            ]
          },
          {
            "name": "{cherry_visitor_yuki}",
            "description": "{cherry_visitor_yuki} is a Japanese woman in her late twenties with shoulder-length straight black hair, soft pale skin, and a serene smile. She wears a pink-and-cream floral printed yukata, a soft pink obi, traditional white tabi socks, and red lacquered geta sandals.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{cherry_blossoms}",
            "description": "{cherry_blossoms} is a row of full-bloom pink-and-white cherry blossom trees in a Japanese park, branches heavy with petals and a few drifting on the breeze.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{wooden_bench}",
            "description": "{wooden_bench} is a simple wooden park bench beneath one of the cherry trees.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_ueno_park_hanami}",
            "description": "{scene_ueno_park_hanami} is Ueno Park during cherry blossom hanami season \u2014 a long path lined with cherry trees, blue tarp picnics scattered on the grass, families and friends laughing, scattered petals on the ground, and soft afternoon spring light.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide of the cherry-blossom-lined path with people picnicking.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{cherry_visitor_yuki}",
            "description": "{cherry_visitor_yuki} walks the path, pausing to look up at blossoms.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{cherry_blossoms}",
            "description": "{cherry_blossoms} flutter and drift across the scene throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{wooden_bench}",
            "description": "{wooden_bench} sits beneath the tree throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_ueno_park_hanami}",
            "description": "{scene_ueno_park_hanami} bathes in soft afternoon spring light throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the bench medium.",
            "time_intervals": [
              3.918,
              3.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a medium of {cherry_visitor_yuki} sitting on {wooden_bench} under blossoms.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{cherry_visitor_yuki}",
            "description": "{cherry_visitor_yuki} sits on the wooden bench, hands folded in her lap.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the petals.",
            "time_intervals": [
              7.018,
              7.018009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up of {cherry_blossoms} drifting onto her lap.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{cherry_visitor_yuki}",
            "description": "{cherry_visitor_yuki}'s hand catches a falling petal in close-up, eyes closing.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          }
        ],
        "summary": "In Ueno Park during cherry blossom hanami season \u2014 a long path lined with cherry trees, blue tarp picnics scattered on the grass, families and friends laughing, scattered petals on the ground, soft afternoon spring light, and a row of full-bloom pink-and-white cherry blossom trees with branches heavy with petals \u2014 a Japanese woman in her late twenties with shoulder-length straight black hair, soft pale skin, serene smile, pink-and-cream floral yukata, soft pink obi, traditional white tabi socks, and red lacquered geta sandals walks the path. A simple wooden park bench sits beneath one of the trees. The camera opens on a wide. A hard cut at four seconds tightens to a medium as she sits on the bench, hands folded. A final hard cut at seven seconds tightens to a close-up as her hand catches a falling petal, eyes closing."
      },
      "refs": [
        {
          "src": "data/13/refs/00_cherry_visitor_yuki.jpg",
          "name": "{cherry_visitor_yuki}"
        },
        {
          "src": "data/13/refs/01_cherry_blossoms.jpg",
          "name": "{cherry_blossoms}"
        },
        {
          "src": "data/13/refs/02_wooden_bench.jpg",
          "name": "{wooden_bench}"
        }
      ],
      "desc": "Cherry blossom hanami"
    },
    {
      "seq": "14",
      "video": "data/14/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.018,
                3.01801
              ],
              [
                6.512,
                6.512009999999999
              ]
            ]
          },
          {
            "name": "{singer_bea}",
            "description": "{singer_bea} is a Black woman in her early twenties with closely shaved hair dyed platinum blond, a small gold nose stud, and warm brown eyes. She wears oversized studio headphones, a sleeveless cream knit top, and ripped acid-wash jeans, with a single jeweled pendant on a slim chain.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{producer_kai}",
            "description": "{producer_kai} is a Japanese man in his mid-thirties with a long ponytail of black hair, square gold-framed glasses, and a goatee. He wears a faded black band t-shirt and dark jeans, with a thick collection of bracelets stacked on one wrist.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{condenser_mic}",
            "description": "{condenser_mic} is a tall vintage condenser microphone, brass-bodied with a black mesh head, suspended in a chrome shock mount on a boom arm.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_vocal_booth}",
            "description": "{scene_vocal_booth} is a small soundproofed vocal booth with charcoal acoustic foam wedges on the walls and ceiling, a thick burgundy curtain on the back wall, and warm orange-amber LED accent lighting.",
            "time_intervals": [
              [
                0.0,
                3.018
              ],
              [
                6.512,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_control_room}",
            "description": "{scene_control_room} is the dim adjacent control room with a long mixing console covered in faders and glowing meters, a wraparound desk, two flatscreen monitors, and a window looking through to the booth.",
            "time_intervals": [
              [
                3.018,
                6.512
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} is a static medium shot of {singer_bea} in the booth, framed by acoustic foam.",
            "time_intervals": [
              0.0,
              3.018
            ]
          },
          {
            "name": "{singer_bea}",
            "description": "{singer_bea} closes her eyes and breathes deep, hand cupping one ear of her headphones.",
            "time_intervals": [
              0.0,
              3.018
            ]
          },
          {
            "name": "{producer_kai}",
            "description": "{producer_kai} is barely visible behind the booth glass with a hand on the talkback button.",
            "time_intervals": [
              0.0,
              3.018
            ]
          },
          {
            "name": "{scene_vocal_booth}",
            "description": "{scene_vocal_booth} surrounds {singer_bea} with charcoal foam and warm amber light during the booth shots.",
            "time_intervals": [
              0.0,
              3.018
            ]
          },
          {
            "name": "{condenser_mic}",
            "description": "{condenser_mic} hangs in front of {singer_bea}, the shock mount holding it steady.",
            "time_intervals": [
              0.0,
              6.512
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut from the booth to the control room.",
            "time_intervals": [
              3.018,
              3.01801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to the control room, a wide shot looking past {producer_kai} at the desk through the booth window.",
            "time_intervals": [
              3.018,
              6.512
            ]
          },
          {
            "name": "{singer_bea}",
            "description": "{singer_bea} is visible through the booth window beyond {producer_kai}, mouth opening as she sings.",
            "time_intervals": [
              3.018,
              6.512
            ]
          },
          {
            "name": "{producer_kai}",
            "description": "{producer_kai} sits at the console, head nodding to the beat, fingers riding faders.",
            "time_intervals": [
              3.018,
              6.512
            ]
          },
          {
            "name": "{scene_control_room}",
            "description": "{scene_control_room} is dim and lit by glowing meters, with the booth visible through a wide window.",
            "time_intervals": [
              3.018,
              6.512
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the close-up at the microphone.",
            "time_intervals": [
              6.512,
              6.512009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts back to a tight close-up of {singer_bea}'s mouth at the microphone.",
            "time_intervals": [
              6.512,
              10.199999809265137
            ]
          },
          {
            "name": "{singer_bea}",
            "description": "{singer_bea}'s lips are inches from the {condenser_mic}, holding a long sustained note that fades.",
            "time_intervals": [
              6.512,
              10.199999809265137
            ]
          },
          {
            "name": "{producer_kai}",
            "description": "{producer_kai}'s reflection in the booth glass watches with a small approving smile.",
            "time_intervals": [
              6.512,
              10.199999809265137
            ]
          },
          {
            "name": "{condenser_mic}",
            "description": "{condenser_mic} fills the close-up frame, its black mesh head inches from {singer_bea}'s lips.",
            "time_intervals": [
              6.512,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_vocal_booth}",
            "description": "{scene_vocal_booth} fills the frame again as the camera returns to {singer_bea} at the microphone.",
            "time_intervals": [
              6.512,
              10.199999809265137
            ]
          }
        ],
        "summary": "Inside a small soundproofed vocal booth lined with charcoal acoustic foam wedges, a thick burgundy curtain along the back wall, and warm orange-amber LED accent lighting, a Black singer in her early twenties with platinum-blond shaved hair, a small gold nose stud, oversized studio headphones, a sleeveless cream knit top, and ripped acid-wash jeans stands in front of a tall brass-bodied vintage condenser microphone with a black mesh head suspended in a chrome shock mount on a boom arm. The static medium shot frames her closing her eyes and breathing deep with one hand cupping a headphone for about three seconds, then hard-cuts to the dim adjacent control room where a Japanese producer in his mid-thirties with a black ponytail, gold-framed glasses, a goatee, a faded band t-shirt, and stacks of wrist bracelets sits at a long mixing console of glowing meters and faders, head nodding while she sings on the other side of the booth window. A second hard cut tightens to a close-up of her lips at the microphone holding a long sustained note that fades while the producer's reflection in the glass smiles approvingly."
      },
      "refs": [
        {
          "src": "data/14/refs/00_singer_bea.jpg",
          "name": "{singer_bea}"
        },
        {
          "src": "data/14/refs/01_producer_kai.jpg",
          "name": "{producer_kai}"
        },
        {
          "src": "data/14/refs/02_condenser_mic.jpg",
          "name": "{condenser_mic}"
        }
      ],
      "desc": "Recording studio session"
    },
    {
      "seq": "15",
      "video": "data/15/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.518,
                3.51801
              ],
              [
                7.218,
                7.21801
              ]
            ]
          },
          {
            "name": "{mechanic_dani}",
            "description": "{mechanic_dani} is a Filipino-American woman in her late twenties with shoulder-length black hair tied up in a high knot, smudges of grease on her cheeks, and bright dark eyes. She wears a dark navy work coverall unzipped to the waist with the sleeves rolled up over a faded gray tank top, scuffed steel-toe boots, and a flat ratchet wrench tucked through her hip belt.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{customer_phil}",
            "description": "{customer_phil} is a stocky white man in his fifties with a beer-belly, flannel shirt, faded jeans, a battered ball cap, and a worn leather wallet sticking from his back pocket, arms folded as he watches.",
            "time_intervals": [
              [
                3.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{lifted_truck}",
            "description": "{lifted_truck} is a dusty red 1980s pickup truck with rust around the wheel arches, raised on a hydraulic two-post lift, oil pan visible underneath.",
            "time_intervals": [
              [
                0.0,
                7.218
              ]
            ]
          },
          {
            "name": "{shop_dog_pickle}",
            "description": "{shop_dog_pickle} is a roly-poly black-and-white spaniel mix in a faded red bandana collar, snoozing on a stack of folded shop towels.",
            "time_intervals": [
              [
                3.518,
                7.218
              ]
            ]
          },
          {
            "name": "{scene_auto_garage}",
            "description": "{scene_auto_garage} is a working-class auto repair shop with stained gray concrete floors, oil-stained pegboards covered in tools, an open roll-up garage door letting in flat afternoon sunlight, a calendar with a vintage car on the wall, a battered red toolbox on wheels, and the smell of motor oil.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} is a low static shot beneath {lifted_truck}, looking up past {mechanic_dani}'s legs as she tightens a bolt.",
            "time_intervals": [
              0.0,
              3.518
            ]
          },
          {
            "name": "{mechanic_dani}",
            "description": "{mechanic_dani} reaches up under the truck, ratcheting a bolt with steady firm strokes.",
            "time_intervals": [
              0.0,
              3.518
            ]
          },
          {
            "name": "{lifted_truck}",
            "description": "{lifted_truck} hangs above her on the lift, oil pan and exhaust visible from below.",
            "time_intervals": [
              0.0,
              3.518
            ]
          },
          {
            "name": "{scene_auto_garage}",
            "description": "{scene_auto_garage} surrounds the bay throughout with tools, a calendar, and dim afternoon light through the open door.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the wide of the bay.",
            "time_intervals": [
              3.518,
              3.51801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a wide medium shot of the bay as {mechanic_dani} steps out from under the truck and waves to {customer_phil}.",
            "time_intervals": [
              3.518,
              7.218
            ]
          },
          {
            "name": "{mechanic_dani}",
            "description": "{mechanic_dani} ducks out from under the truck, wipes her hands on a rag, and grins at {customer_phil}.",
            "time_intervals": [
              3.518,
              7.218
            ]
          },
          {
            "name": "{customer_phil}",
            "description": "{customer_phil} stands at the edge of the bay, arms folded, watching with skeptical eyebrow raised.",
            "time_intervals": [
              3.518,
              7.218
            ]
          },
          {
            "name": "{lifted_truck}",
            "description": "{lifted_truck} sits on the lift in the wide, fully visible.",
            "time_intervals": [
              3.518,
              7.218
            ]
          },
          {
            "name": "{shop_dog_pickle}",
            "description": "{shop_dog_pickle} is curled on the towels in the corner, eyes shut throughout, paws twitching.",
            "time_intervals": [
              3.518,
              7.218
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the close-up.",
            "time_intervals": [
              7.218,
              7.21801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up of her grease-streaked face as she gives him a thumbs-up.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          },
          {
            "name": "{mechanic_dani}",
            "description": "{mechanic_dani}'s face fills the close-up, smudge across her cheekbone, eyes crinkling with a thumbs-up.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          },
          {
            "name": "{customer_phil}",
            "description": "{customer_phil} is faintly visible behind her in the close-up, breaking into a relieved smile.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          }
        ],
        "summary": "In a working-class auto repair shop with stained gray concrete floors, oil-stained pegboards of tools, an open roll-up garage door letting in flat afternoon sunlight, a calendar with a vintage car on the wall, a battered red rolling toolbox, and the smell of motor oil, a low static shot beneath a dusty red 1980s pickup truck with rust around the wheel arches raised on a hydraulic two-post lift looks up past the legs of a Filipino-American mechanic in her late twenties with shoulder-length black hair in a high knot, grease smudges on her cheeks, dark navy coveralls unzipped to the waist over a faded gray tank top, scuffed steel-toe boots, and a flat ratchet wrench through her hip belt as she tightens a bolt with firm strokes. After three and a half seconds a hard cut to a wide medium of the bay shows her ducking out, wiping her hands on a rag, and grinning at a stocky middle-aged white customer in flannel, faded jeans, and a battered ball cap with arms folded skeptically while a roly-poly black-and-white spaniel mix in a red bandana naps on a stack of shop towels. A final hard cut to a tight close-up of her grease-streaked face shows her giving him a thumbs-up, eyes crinkling, while he breaks into a relieved smile behind her."
      },
      "refs": [
        {
          "src": "data/15/refs/00_mechanic_dani.jpg",
          "name": "{mechanic_dani}"
        },
        {
          "src": "data/15/refs/01_customer_phil.jpg",
          "name": "{customer_phil}"
        },
        {
          "src": "data/15/refs/02_lifted_truck.jpg",
          "name": "{lifted_truck}"
        },
        {
          "src": "data/15/refs/03_shop_dog_pickle.jpg",
          "name": "{shop_dog_pickle}"
        }
      ],
      "desc": "Auto repair shop"
    },
    {
      "seq": "16",
      "video": "data/16/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.918,
                3.91801
              ]
            ]
          },
          {
            "name": "{painter_clementine}",
            "description": "{painter_clementine} is a French painter in her early thirties with shoulder-length wavy auburn hair tucked under a sun hat, freckled fair skin, and bright green eyes. She wears a paint-spattered cream linen smock over a striped Breton shirt, blue denim trousers rolled at the ankles, and tan leather espadrilles.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{watercolor_palette}",
            "description": "{watercolor_palette} is a worn metal watercolor palette with sixteen pans of vibrant pigment, mixed swirls of blue, ochre, rose, and green.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{painting_in_progress}",
            "description": "{painting_in_progress} is a half-finished watercolor on heavy paper showing a Provencal lavender field \u2014 wet washes of purple, distant blue mountains, and a small farmhouse penciled in.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{lavender_field}",
            "description": "{lavender_field} is the actual real lavender field in front of her \u2014 long rows of purple lavender stretching to a stone farmhouse, framed by cypress trees.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{wooden_easel}",
            "description": "{wooden_easel} is a portable wooden field easel with the watercolor pinned to it.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_provence_lavender_overlook}",
            "description": "{scene_provence_lavender_overlook} is a hillside overlook in Provence \u2014 long rows of purple lavender stretching to a small stone farmhouse, distant blue Alpilles, scattered cypress trees, golden hour summer sun, and a faint hum of bees.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide overlook of {scene_provence_lavender_overlook} with {painter_clementine} small at her easel.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{painter_clementine}",
            "description": "{painter_clementine} stands at the easel, brush dipped, eyes flicking between field and paper.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{watercolor_palette}",
            "description": "{watercolor_palette} sits open on a small camp table beside her, swirling with pigment.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{painting_in_progress}",
            "description": "{painting_in_progress} grows clearer with new wet washes throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{lavender_field}",
            "description": "{lavender_field} stretches before her in golden hour throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{wooden_easel}",
            "description": "{wooden_easel} holds the painting steady throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_provence_lavender_overlook}",
            "description": "{scene_provence_lavender_overlook} bathes everything in golden hour summer sun and bee-hum throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the brush close-up.",
            "time_intervals": [
              3.918,
              3.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up of her brush dipping into {watercolor_palette} and stroking onto {painting_in_progress}.",
            "time_intervals": [
              3.918,
              7.218
            ]
          },
          {
            "name": "{painter_clementine}",
            "description": "{painter_clementine}'s brush dips into a swirl of purple and lays a wet wash on the lavender rows.",
            "time_intervals": [
              3.918,
              7.218
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a profile of {painter_clementine} looking from {lavender_field} to her painting and back.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          },
          {
            "name": "{painter_clementine}",
            "description": "{painter_clementine} steps back from the easel and tilts her head, considering, hat shadowing her eyes.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          }
        ],
        "summary": "On a hillside overlook in Provence \u2014 long rows of purple lavender stretching to a small stone farmhouse, distant blue Alpilles, scattered cypress trees, golden hour summer sun, and the faint hum of bees \u2014 a French painter in her early thirties with shoulder-length wavy auburn hair tucked under a sun hat, freckled fair skin, bright green eyes, paint-spattered cream linen smock over a striped Breton shirt, rolled blue denim trousers, and tan leather espadrilles stands at a portable wooden field easel pinned with a half-finished watercolor of the lavender field \u2014 wet washes of purple, distant blue mountains, a penciled farmhouse \u2014 beside a worn sixteen-pan metal palette swirling with pigment. The camera opens on a wide overlook. A hard cut at four seconds tightens to a close-up of her brush dipping into a swirl of purple and laying a wet wash on the lavender rows. A final hard cut at seven seconds tightens to her profile as she steps back, tilts her head, and looks from field to painting and back, hat shadowing her eyes."
      },
      "refs": [
        {
          "src": "data/16/refs/00_painter_clementine.jpg",
          "name": "{painter_clementine}"
        },
        {
          "src": "data/16/refs/01_watercolor_palette.jpg",
          "name": "{watercolor_palette}"
        },
        {
          "src": "data/16/refs/02_painting_in_progress.jpg",
          "name": "{painting_in_progress}"
        },
        {
          "src": "data/16/refs/03_lavender_field.jpg",
          "name": "{lavender_field}"
        }
      ],
      "desc": "Lavender field watercolor"
    },
    {
      "seq": "17",
      "video": "data/17/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.918,
                3.91801
              ],
              [
                7.218,
                7.21801
              ]
            ]
          },
          {
            "name": "{aunt_lakshmi}",
            "description": "{aunt_lakshmi} is a South Indian aunt in her early sixties with neat gray-streaked black hair pulled into a low bun, a small bindi between her brows, kind expressive eyes, and warm laugh lines. She wears a turquoise-and-gold cotton saree, a small gold chain necklace, gold bangles on both wrists, and a white-and-gold cotton apron.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{cast_iron_tava}",
            "description": "{cast_iron_tava} is a large round black cast-iron tava (griddle) heated over a gas burner, its surface shimmering hot.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{dosa_batter_ladle}",
            "description": "{dosa_batter_ladle} is a metal ladle scooping pale fermented dosa batter from a steel bowl.",
            "time_intervals": [
              [
                0.0,
                7.218
              ]
            ]
          },
          {
            "name": "{dosa_spreading}",
            "description": "{dosa_spreading} is the thin pale batter spreading in a perfect spiral across the tava, edges crisping golden-brown.",
            "time_intervals": [
              [
                3.918,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{spice_chutney_bowls}",
            "description": "{spice_chutney_bowls} is a row of small steel bowls of green coconut chutney, red tomato chutney, and dark sambar beside the tava.",
            "time_intervals": [
              [
                0.0,
                3.918
              ],
              [
                7.218,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_kerala_kitchen}",
            "description": "{scene_kerala_kitchen} is a sunny South Indian Kerala home kitchen \u2014 pale yellow tiled walls, a wooden cooking corner with a stainless steel countertop, a small steel god-shrine in the corner, hanging garlic strings, lush coconut palms visible through an open window, and warm tropical morning light.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide of {aunt_lakshmi} at the stove with {cast_iron_tava} hot.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{aunt_lakshmi}",
            "description": "{aunt_lakshmi} stands at the stove humming, ladle in hand, watching the tava heat.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{spice_chutney_bowls}",
            "description": "{spice_chutney_bowls} sits beside the tava with green, red, and dark sambar throughout.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{dosa_batter_ladle}",
            "description": "{dosa_batter_ladle} scoops batter and sweeps in a spiral across the tava.",
            "time_intervals": [
              0.0,
              7.218
            ]
          },
          {
            "name": "{cast_iron_tava}",
            "description": "{cast_iron_tava} sizzles hot throughout, the dosa bubbling and crisping.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_kerala_kitchen}",
            "description": "{scene_kerala_kitchen} is bathed in tropical morning light with coconut palms throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the spreading top-down.",
            "time_intervals": [
              3.918,
              3.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a top-down close-up of {dosa_batter_ladle} spreading {dosa_spreading} in a spiral on the tava.",
            "time_intervals": [
              3.918,
              7.218
            ]
          },
          {
            "name": "{aunt_lakshmi}",
            "description": "{aunt_lakshmi}'s hand spreads the batter in a perfect spiral with the back of {dosa_batter_ladle}.",
            "time_intervals": [
              3.918,
              7.218
            ]
          },
          {
            "name": "{dosa_spreading}",
            "description": "{dosa_spreading} spreads thin in a perfect spiral, edges turning golden-brown.",
            "time_intervals": [
              3.918,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the plating.",
            "time_intervals": [
              7.218,
              7.21801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a medium of {aunt_lakshmi} sliding the finished crispy dosa onto a plate beside {spice_chutney_bowls}.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          },
          {
            "name": "{aunt_lakshmi}",
            "description": "{aunt_lakshmi} folds the crispy dosa, slides it onto a banana leaf plate beside the chutneys.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          },
          {
            "name": "{spice_chutney_bowls}",
            "description": "{spice_chutney_bowls} sits beside the tava with green, red, and dark sambar throughout.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          }
        ],
        "summary": "In a sunny South Indian Kerala home kitchen \u2014 pale yellow tiled walls, a wooden cooking corner with a stainless steel countertop, a small steel god-shrine in the corner, hanging garlic strings, lush coconut palms visible through an open window, and warm tropical morning light \u2014 a South Indian aunt in her early sixties with neat gray-streaked black hair pulled into a low bun, small bindi between her brows, kind expressive eyes, warm laugh lines, turquoise-and-gold cotton saree, small gold chain, gold bangles on both wrists, and white-and-gold cotton apron stands at the stove humming over a large round black cast-iron tava heated over a gas burner with batter spreading in a perfect spiral, edges crisping golden-brown. A row of small steel bowls of green coconut chutney, red tomato chutney, and dark sambar sits beside it. The camera opens on a wide. A hard cut at four seconds tightens to a top-down close-up of her ladle's back spreading the pale fermented batter in a perfect spiral. A final hard cut at seven seconds tightens to a medium as she folds the crispy dosa and slides it onto a banana leaf plate beside the chutneys."
      },
      "refs": [
        {
          "src": "data/17/refs/00_aunt_lakshmi.jpg",
          "name": "{aunt_lakshmi}"
        },
        {
          "src": "data/17/refs/01_cast_iron_tava.jpg",
          "name": "{cast_iron_tava}"
        },
        {
          "src": "data/17/refs/02_dosa_batter_ladle.jpg",
          "name": "{dosa_batter_ladle}"
        },
        {
          "src": "data/17/refs/03_dosa_spreading.jpg",
          "name": "{dosa_spreading}"
        }
      ],
      "desc": "Making dosas"
    },
    {
      "seq": "18",
      "video": "data/18/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.918,
                3.91801
              ],
              [
                7.018,
                7.018009999999999
              ]
            ]
          },
          {
            "name": "{spacewalker_anton}",
            "description": "{spacewalker_anton} is a Russian cosmonaut in his fifties in a Sokol blue-and-white spacesuit with helmet visor up. He has a thick gray mustache, weathered features, and confident dark eyes.",
            "time_intervals": [
              [
                3.918,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{soyuz_capsule}",
            "description": "{soyuz_capsule} is a battered Soviet-era Soyuz capsule with cyrillic markings, a parachute spread on the ground beside it.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{kazakh_steppe_landing}",
            "description": "{kazakh_steppe_landing} is the wide flat Kazakh steppe at landing - tan grass, scattered low scrub, distant low hills, a recovery helicopter in the distance, and clear blue sky.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{recovery_team}",
            "description": "{recovery_team} is the Russian space recovery team in matching coveralls running toward the capsule.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_steppe_recovery}",
            "description": "{scene_steppe_recovery} is the Soyuz landing recovery site - dusty steppe with the parachuted capsule on its side, scattered medical equipment, helicopter dust kicked up, and warm afternoon light.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide aerial of the capsule on the steppe.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{soyuz_capsule}",
            "description": "{soyuz_capsule} sits on its side throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{kazakh_steppe_landing}",
            "description": "{kazakh_steppe_landing} stretches around throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{recovery_team}",
            "description": "{recovery_team} attends to him throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_steppe_recovery}",
            "description": "{scene_steppe_recovery} bathes in afternoon light and helicopter dust throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the hatch.",
            "time_intervals": [
              3.918,
              3.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a medium of {spacewalker_anton} being helped out of the hatch.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{spacewalker_anton}",
            "description": "{spacewalker_anton} is helped out of the hatch by recovery team members.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to his grin.",
            "time_intervals": [
              7.018,
              7.018009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up of his weathered grin.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{spacewalker_anton}",
            "description": "{spacewalker_anton} grins, weathered face squinting, gives a thumbs-up.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          }
        ],
        "summary": "On the Soyuz landing recovery site on the wide flat Kazakh steppe at landing - tan grass, scattered low scrub, distant low hills, a recovery helicopter in the distance, clear blue sky, parachuted Soyuz capsule on its side with cyrillic markings, scattered medical equipment, and warm afternoon light - a Russian cosmonaut in his fifties in a Sokol blue-and-white spacesuit with thick gray mustache, weathered features, and confident dark eyes is helped out of the hatch by the Russian recovery team in matching coveralls. The camera opens with a wide aerial. A hard cut at four seconds tightens to a medium at the hatch. A final hard cut at seven seconds tightens to a close-up of his weathered grin as he gives a thumbs-up."
      },
      "refs": [
        {
          "src": "data/18/refs/00_spacewalker_anton.jpg",
          "name": "{spacewalker_anton}"
        },
        {
          "src": "data/18/refs/01_soyuz_capsule.jpg",
          "name": "{soyuz_capsule}"
        },
        {
          "src": "data/18/refs/02_kazakh_steppe_landing.jpg",
          "name": "{kazakh_steppe_landing}"
        },
        {
          "src": "data/18/refs/03_recovery_team.jpg",
          "name": "{recovery_team}"
        }
      ],
      "desc": "Soyuz capsule landing"
    },
    {
      "seq": "19",
      "video": "data/19/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.0,
                3.0
              ],
              [
                5.4,
                5.4
              ],
              [
                7.4,
                7.4
              ]
            ]
          },
          {
            "name": "{prairie_cowboy}",
            "description": "{prairie_cowboy} is a wiry American man in his early forties with a sun-leathered tanned face, a thick close-trimmed dark moustache, sharp tired pale-blue eyes, a battered fawn-coloured wide-brim cowboy hat low on his brow, a slim brown leather-trimmed grey wool shirt, a worn dark-tan leather vest with a slim silver star-pin, slim weathered blue denim jeans with a thick leather belt, scuffed brown leather riding boots with slim worn spurs, and a slim red kerchief loose around his neck.",
            "time_intervals": [
              [
                0.0,
                5.4
              ]
            ]
          },
          {
            "name": "{tin_coffee_cup}",
            "description": "{tin_coffee_cup} is a single battered blue enamel tin camping coffee cup about a hand wide with slim chipped white edges around the rim, a small flat thumb-handle riveted at one side, dark coffee filling it half-full, faint steam curling up, and faint dark dings and scratches across the body from years of trail use.",
            "time_intervals": [
              [
                5.4,
                7.4
              ]
            ]
          },
          {
            "name": "{campfire}",
            "description": "{campfire} is a small low campfire of about three small charred mesquite logs arranged in a triangle on a small bed of pale-grey ashes, hot orange and yellow flames licking up between them with small bright cracking sparks lifting lazily, a slim curl of pale-grey smoke rising into the night, and a slim ring of small dark stones placed around the outside.",
            "time_intervals": [
              [
                0.0,
                3.0
              ]
            ]
          },
          {
            "name": "{cowboy_horse}",
            "description": "{cowboy_horse} is a tall sturdy bay quarter-horse with a deep chestnut coat fading toward dark legs, a long flowing dark mane and tail, calm dark brown eyes, a worn dark-brown western-style leather saddle with a slim braided lasso looped to the horn, slim hand-tooled leather flank-cinch, a slim hackamore bridle, and iron-shod hooves still.",
            "time_intervals": [
              [
                7.4,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_starry_prairie}",
            "description": "{scene_starry_prairie} is a wide American prairie at night under a vast dome of stars: rolling pale-tan grassland stretching unbroken to a flat distant horizon, the Milky Way blazing across the cobalt-black sky overhead, a thin pale crescent moon low on the horizon, scattered low sagebrush and yucca silhouetted at distance, a soft sigh of dry warm wind through the grass, the distant howl of a single coyote, and slim drifting embers from the campfire being carried sideways on the breeze.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "time_intervals": [
              0.0,
              3.0
            ],
            "description": "{camera} is a slow circling crane shot starting on the bright low {campfire} on the ground and tilting up and around to find {prairie_cowboy} sitting beside it on his bedroll, tin cup in hand."
          },
          {
            "name": "{prairie_cowboy}",
            "time_intervals": [
              0.0,
              3.0
            ],
            "description": "{prairie_cowboy} sits on his bedroll beside the campfire with the tin cup loose in one hand, hat low across his brow."
          },
          {
            "name": "{campfire}",
            "time_intervals": [
              0.0,
              3.0
            ],
            "description": "{campfire} crackles low between the three small mesquite logs at the start of the crane, small bright sparks lifting lazily into the night air."
          },
          {
            "name": "{scene_starry_prairie}",
            "time_intervals": [
              0.0,
              10.199999809265137
            ],
            "description": "{scene_starry_prairie} stretches wide and dark around the small fire, the Milky Way blazing overhead, a thin pale crescent moon low on the horizon, the distant howl of a single coyote carrying through the warm dry air."
          },
          {
            "name": "{transition}",
            "time_intervals": [
              3.0,
              3.0
            ],
            "description": "{transition} shows a hard cut to the cowboy's firelit close-up."
          },
          {
            "name": "{camera}",
            "time_intervals": [
              3.0,
              5.4
            ],
            "description": "{camera} cuts to a tight close-up of {prairie_cowboy}'s face, firelight flickering warm orange across one side and starlight cool on the other."
          },
          {
            "name": "{prairie_cowboy}",
            "time_intervals": [
              3.0,
              5.4
            ],
            "description": "{prairie_cowboy}'s face fills the close-up, firelight flickering warm orange across one side and cool starlight on the other, a faint sad smile at one corner of his mouth."
          },
          {
            "name": "{transition}",
            "time_intervals": [
              5.4,
              5.4
            ],
            "description": "{transition} shows a hard cut to the tin-cup insert."
          },
          {
            "name": "{camera}",
            "time_intervals": [
              5.4,
              7.4
            ],
            "description": "{camera} cuts to a tight insert of his weathered hand wrapped around {tin_coffee_cup}, thin steam curling up between his fingers."
          },
          {
            "name": "{tin_coffee_cup}",
            "time_intervals": [
              5.4,
              7.4
            ],
            "description": "{tin_coffee_cup}'s blue enamel fills the insert in his weathered hand, thin steam curling up between his fingers."
          },
          {
            "name": "{transition}",
            "time_intervals": [
              7.4,
              7.4
            ],
            "description": "{transition} shows a slow half-second cross-dissolve through drifting embers to the wide low-angle of the horse against the Milky Way."
          },
          {
            "name": "{camera}",
            "time_intervals": [
              7.4,
              10.199999809265137
            ],
            "description": "{camera} cuts to a wide low-angle of {cowboy_horse} standing motionless at the edge of the firelight against the vast star-strewn sky."
          },
          {
            "name": "{cowboy_horse}",
            "time_intervals": [
              7.4,
              10.199999809265137
            ],
            "description": "{cowboy_horse} stands motionless at the edge of the firelight, slim hackamore bridle just catching faint warm orange glow, the vast star-strewn sky behind."
          }
        ],
        "summary": "On a wide prairie under a vast dome of stars, a lone cowboy sits by a small campfire holding a tin coffee cup. Sparks lift slowly from the fire. His horse stands at the edge of the firelight. A coyote howls in the far distance."
      },
      "refs": [
        {
          "src": "data/19/refs/00_prairie_cowboy.jpg",
          "name": "{prairie_cowboy}"
        },
        {
          "src": "data/19/refs/01_tin_coffee_cup.jpg",
          "name": "{tin_coffee_cup}"
        },
        {
          "src": "data/19/refs/02_campfire.jpg",
          "name": "{campfire}"
        },
        {
          "src": "data/19/refs/03_cowboy_horse.jpg",
          "name": "{cowboy_horse}"
        }
      ],
      "desc": "Cowboy at campfire"
    },
    {
      "seq": "20",
      "video": "data/20/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.6,
                2.6
              ],
              [
                4.6,
                4.6
              ],
              [
                6.6,
                6.6
              ]
            ]
          },
          {
            "name": "{jazz_drummer}",
            "description": "{jazz_drummer} is a Cuban-American man in his late thirties with closely cropped black hair, a thin trimmed dark moustache and goatee, a sweat-glistening dark face under one warm-blue spotlight, sharp focused brown eyes half-closed in concentration, a slim cream short-sleeved guayabera shirt, slim dark jeans, slim brown leather oxfords, a slim silver wedding band, and a slim pair of hardwood drumsticks blurred mid-stroke between his hands.",
            "time_intervals": [
              [
                0.0,
                2.6
              ],
              [
                4.6,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{drum_kit}",
            "description": "{drum_kit} is a single small vintage four-piece jazz drum-kit: a slim small-shell deep-burgundy maple bass-drum with a slim wooden hoop, a single matching small mounted tom on the kit, a single matching small floor-tom on three slim chrome legs, a single slim snare-drum with a chrome shell and a slim wire snare-strainer, a single small ride-cymbal on a slim chrome boom-stand, a single small hi-hat pair on a slim chrome stand, and a slim drum-throne stool.",
            "time_intervals": [
              [
                2.6,
                4.6
              ]
            ]
          },
          {
            "name": "{drumsticks}",
            "description": "{drumsticks} is a pair of slim straight hardwood jazz drumsticks: each about a hand and a half long with a slim tapered shaft, a small rounded teardrop wooden tip, a slim small lacquered finish along the body, faint pale-blue cymbal-residue stains near the tip, and the slim small letter 'B' burned along the side of the shaft.",
            "time_intervals": [
              [
                2.6,
                4.6
              ]
            ]
          },
          {
            "name": "{spotlight_stage}",
            "description": "{spotlight_stage} is a single warm-blue theatrical spotlight pouring straight down from above the small stage: a slim circular pool of cool blue-white light about a body and a half wide on the dark wooden boards, slim sharp-edged shadow at the rim of the pool, slim faint dust motes drifting through the beam, and a slim cool-blue secondary glow spilling out at the edges.",
            "time_intervals": [
              [
                6.6,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_jazz_club_midnight}",
            "description": "{scene_jazz_club_midnight} is the interior of a small dim 50-seat jazz club at midnight: deep blue-painted walls covered in framed black-and-white photographs of past jazz greats, a small low wooden stage in one corner about a body wide and three bodies long with a slim deep-burgundy curtain along the back, three other empty chairs on stage with a slim upright bass leaning against one and a slim trumpet on its stand beside another, a small intimate scatter of about a dozen candlelit round tables in front of the stage with a few patrons in shadowed silhouette, a slim chrome-rimmed bar at the far back, slim drifting cigarette smoke catching the spotlight, and the soft murmur of an attentive audience.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "time_intervals": [
              0.0,
              2.6
            ],
            "description": "{camera} is a slow wide handheld dolly from the back of the club between candlelit tables toward the stage, {jazz_drummer} small in the warm-blue spotlight at the kit, the other quartet members' empty chairs around him."
          },
          {
            "name": "{jazz_drummer}",
            "time_intervals": [
              0.0,
              2.6
            ],
            "description": "{jazz_drummer} sits small at the kit in the warm-blue spotlight, sticks blurring across snare and ride."
          },
          {
            "name": "{scene_jazz_club_midnight}",
            "time_intervals": [
              0.0,
              10.199999809265137
            ],
            "description": "{scene_jazz_club_midnight} surrounds the stage in deep blue walls and framed black-and-white photographs, scattered candlelit round tables with patrons in shadowed silhouette, drifting cigarette smoke catching the spot."
          },
          {
            "name": "{transition}",
            "time_intervals": [
              2.6,
              2.6
            ],
            "description": "{transition} shows a hard cut from the dolly to the overhead ride-cymbal insert."
          },
          {
            "name": "{camera}",
            "time_intervals": [
              2.6,
              4.6
            ],
            "description": "{camera} cuts to a tight overhead insert directly down on the ride-cymbal of {drum_kit}, the slim hardwood drumstick tip striking it in rapid soft pings, slim faint dust on the cymbal flying with each strike."
          },
          {
            "name": "{drum_kit}",
            "time_intervals": [
              2.6,
              4.6
            ],
            "description": "{drum_kit}'s small ride-cymbal fills the overhead insert as the slim hardwood tip strikes it in rapid soft pings, faint cymbal-dust flying with each strike."
          },
          {
            "name": "{drumsticks}",
            "time_intervals": [
              2.6,
              4.6
            ],
            "description": "{drumsticks} blur back and forth in tight insert across the cymbal, slim tapered shafts whipping through warm-blue light."
          },
          {
            "name": "{transition}",
            "time_intervals": [
              4.6,
              4.6
            ],
            "description": "{transition} shows a hard cut to the drummer's sweat-glistening close-up."
          },
          {
            "name": "{camera}",
            "time_intervals": [
              4.6,
              6.6
            ],
            "description": "{camera} cuts to a tight close-up of {jazz_drummer}'s sweat-glistening face from the side, eyes half-closed in concentration, a single drop of sweat tracking down his temple."
          },
          {
            "name": "{jazz_drummer}",
            "time_intervals": [
              4.6,
              6.6
            ],
            "description": "{jazz_drummer}'s sweat-glistening face fills the side close-up, eyes half-closed, a single sweat-drop tracking down his temple."
          },
          {
            "name": "{transition}",
            "time_intervals": [
              6.6,
              6.6
            ],
            "description": "{transition} shows a half-second slow cross-dissolve through drifting cigarette smoke to the low-angle wide of him under the spotlight."
          },
          {
            "name": "{camera}",
            "time_intervals": [
              6.6,
              10.199999809265137
            ],
            "description": "{camera} cuts to a low-angle wide of {jazz_drummer} centred in {spotlight_stage} with the kit silhouetted against the deep blue club, slim drifting smoke catching the warm-blue light."
          },
          {
            "name": "{jazz_drummer}",
            "time_intervals": [
              6.6,
              10.199999809265137
            ],
            "description": "{jazz_drummer} sits centred under the warm-blue spotlight in the low-angle wide, kit silhouetted around him, sticks still blurring across cymbal and snare."
          },
          {
            "name": "{spotlight_stage}",
            "time_intervals": [
              6.6,
              10.199999809265137
            ],
            "description": "{spotlight_stage} pours straight down on him in a slim sharp pool of warm-blue light, slim drifting cigarette smoke catching the beam."
          }
        ],
        "summary": "On the small low stage of a dim blue-walled jazz club at midnight, the drummer of a small quartet takes a short solo, sweat at his brow, sticks blurring across his ride and snare. A single warm-blue spotlight catches him. The empty chairs of the other quartet members sit silent for the solo."
      },
      "refs": [
        {
          "src": "data/20/refs/00_jazz_drummer.jpg",
          "name": "{jazz_drummer}"
        },
        {
          "src": "data/20/refs/01_drum_kit.jpg",
          "name": "{drum_kit}"
        },
        {
          "src": "data/20/refs/02_drumsticks.jpg",
          "name": "{drumsticks}"
        },
        {
          "src": "data/20/refs/03_spotlight_stage.jpg",
          "name": "{spotlight_stage}"
        }
      ],
      "desc": "Jazz drum solo"
    },
    {
      "seq": "21",
      "video": "data/21/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.0,
                3.0
              ],
              [
                5.4,
                5.4
              ],
              [
                7.4,
                7.4
              ]
            ]
          },
          {
            "name": "{midcentury_architect}",
            "description": "{midcentury_architect} is a tall Japanese-American woman in her early forties with chin-length straight glossy black hair tucked behind one ear, calm focused dark eyes behind round large tortoiseshell glasses, a clean unlined face with subtle red lipstick, a slim charcoal-grey roll-neck sweater of fine wool over a soft white shirt collar just visible, slim cream high-waist trousers, brown leather pointed loafers, a slim small silver wristwatch on one wrist, and one slim hand resting on the slim T-square across the drawing.",
            "time_intervals": [
              [
                0.0,
                3.0
              ],
              [
                5.4,
                7.4
              ]
            ]
          },
          {
            "name": "{drafting_table}",
            "description": "{drafting_table} is a single mid-century tilted wooden drafting table about a body and a half wide: a slim tilted vellum-pale ash-wood top surface tilted at about thirty degrees on slim heavy steel pedestal legs, a slim wooden hard-edge ruler permanently mounted along the bottom edge, a slim small clip for paper at the top corners, a slim small drafting-task lamp on an adjustable swing-arm clamped to one corner, and a small slim chrome pencil-tray at the very base.",
            "time_intervals": [
              [
                0.0,
                3.0
              ]
            ]
          },
          {
            "name": "{long_t_square}",
            "description": "{long_t_square} is a single classic architect's wooden T-square about a body and a half long: a long flat thin straight-edged slim hardwood blade with a small slim square cross-bar at one end, slim chrome edges along both the long and short sides, slim faint pencil-graphite marks along the length, and a slim small handle-cutout near the cross-bar end.",
            "time_intervals": [
              [
                3.0,
                5.4
              ]
            ]
          },
          {
            "name": "{building_elevation_drawing}",
            "description": "{building_elevation_drawing} is a single large unfolded architectural building-elevation drawing about a body and a half wide on heavy vellum paper: clean precise hand-drawn black ink lines depicting a slim modern multi-storey building facade in long elevation, slim small precise pencil dimension-strings noted along the edges, a small slim title-block in the bottom corner reading 'EAST ELEVATION \u2014 SCALE 1:50', slim small grid-lines just visible in pale blue, and a slim small pencil-coffee-stain ring near one corner.",
            "time_intervals": [
              [
                3.0,
                5.4
              ]
            ]
          },
          {
            "name": "{scene_midcentury_studio}",
            "description": "{scene_midcentury_studio} is a sunlit mid-century architecture studio at golden hour in late afternoon: a long open-plan loft-style floor of pale wide-plank Douglas-fir floors, exposed dark-painted iron-truss ceiling beams, a slim row of tall floor-to-ceiling industrial-grid windows running along one whole wall pouring deep gold afternoon light across the floor, three other empty drafting tables in a slim row at one end with rolled paper-tubes leaning against them, a slim long pin-up wall on one side covered in pinned models and elevation drawings, a small low brown-leather-and-walnut Eames lounge chair in one corner, a slim small scale-model of a building on a slim plinth, and slim drifting motes of warm dust in the slanting light.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "time_intervals": [
              0.0,
              3.0
            ],
            "description": "{camera} is a slow steadicam dolly across the studio toward {midcentury_architect} at her drafting table, deep gold afternoon light slanting in across the floor between her and camera."
          },
          {
            "name": "{midcentury_architect}",
            "time_intervals": [
              0.0,
              3.0
            ],
            "description": "{midcentury_architect} stands at the tilted drafting table with one hand resting on the T-square and the pencil poised in the other."
          },
          {
            "name": "{drafting_table}",
            "time_intervals": [
              0.0,
              3.0
            ],
            "description": "{drafting_table} stands tilted before her on slim heavy steel pedestal legs, slim drafting-task lamp clamped to one corner."
          },
          {
            "name": "{scene_midcentury_studio}",
            "time_intervals": [
              0.0,
              10.199999809265137
            ],
            "description": "{scene_midcentury_studio} stretches around her in a sunlit open-plan loft of pale wide-plank Douglas-fir floors and exposed dark-iron trusses, deep gold afternoon light slanting through tall industrial-grid windows, slim drifting motes of warm dust."
          },
          {
            "name": "{transition}",
            "time_intervals": [
              3.0,
              3.0
            ],
            "description": "{transition} shows a hard cut to the overhead-drawing-insert."
          },
          {
            "name": "{camera}",
            "time_intervals": [
              3.0,
              5.4
            ],
            "description": "{camera} cuts to a tight overhead insert directly down on {building_elevation_drawing} on {drafting_table}, the long {long_t_square} blade sliding slowly down the page beneath her hand."
          },
          {
            "name": "{long_t_square}",
            "time_intervals": [
              3.0,
              5.4
            ],
            "description": "{long_t_square} slides slowly down the page in the overhead insert, its slim straight chrome edge held firm against the side of the table."
          },
          {
            "name": "{building_elevation_drawing}",
            "time_intervals": [
              3.0,
              5.4
            ],
            "description": "{building_elevation_drawing} fills the overhead with clean precise hand-drawn black ink lines of a modern building facade and slim pencil dimension-strings along the edges."
          },
          {
            "name": "{transition}",
            "time_intervals": [
              5.4,
              5.4
            ],
            "description": "{transition} shows a hard cut to her focused close-up."
          },
          {
            "name": "{camera}",
            "time_intervals": [
              5.4,
              7.4
            ],
            "description": "{camera} cuts to a tight close-up of her focused dark eyes behind the tortoiseshell glasses, mouth set slightly tight in concentration."
          },
          {
            "name": "{midcentury_architect}",
            "time_intervals": [
              5.4,
              7.4
            ],
            "description": "{midcentury_architect}'s focused dark eyes fill the tight close-up behind the round tortoiseshell glasses, mouth set slightly tight in concentration."
          },
          {
            "name": "{transition}",
            "time_intervals": [
              7.4,
              7.4
            ],
            "description": "{transition} shows a slow half-second cross-dissolve through warm drifting dust motes into the slow circling reveal."
          },
          {
            "name": "{camera}",
            "time_intervals": [
              7.4,
              10.199999809265137
            ],
            "description": "{camera} cuts to a slow circling reveal around {midcentury_architect} at the drafting table, deep gold light raking across the elevation drawing and the slim small architectural model on its plinth in the background."
          }
        ],
        "summary": "In a sunlit mid-century architecture studio at golden hour, an architect stands at a slim tilted drafting table working a long T-square down the page of a large unfolded building elevation drawing. A slim pencil is poised in her other hand."
      },
      "refs": [
        {
          "src": "data/21/refs/00_midcentury_architect.jpg",
          "name": "{midcentury_architect}"
        },
        {
          "src": "data/21/refs/01_drafting_table.jpg",
          "name": "{drafting_table}"
        },
        {
          "src": "data/21/refs/02_long_t_square.jpg",
          "name": "{long_t_square}"
        },
        {
          "src": "data/21/refs/03_building_elevation_drawing.jpg",
          "name": "{building_elevation_drawing}"
        }
      ],
      "desc": "Architect drafting"
    },
    {
      "seq": "22",
      "video": "data/22/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{pretzel_vendor}",
            "description": "{pretzel_vendor} is a heavyset Egyptian-American man in his early fifties with closely combed thinning silver hair, a thick neat trimmed dark moustache and beard going slim grey at the chin, deeply sun-tanned ruddy cheeks crinkled with a wide laughing smile, sharp warm dark eyes, a slim small white short-sleeved chef's-style cotton shirt buttoned to the throat, a slim small long blue-and-white striped Pretzel-Vendor-style apron tied at the waist, slim faded blue jeans, slim white sneakers, a slim small white paper food-service hat tipped slightly back on his head, slim small clear-plastic food-service gloves, and one slim small pair of slim long stainless-steel kitchen tongs in one hand.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{steam_pretzel_cart}",
            "description": "{steam_pretzel_cart} is a single small classic blue-and-yellow Midtown New York steam-cart about a body-and-a-half wide on four slim small heavy-duty wheels: a slim heavy-painted blue-and-yellow striped sheet-metal body, a slim small heavy lift-up glass-fronted hot-food display along the back compartment with slim small rows of soft pretzels visible inside hanging from slim wire-racks, a slim small large bright yellow plastic 'PRETZELS \u2014 $5' awning over the top, a slim heavy chromed bell on a small slim spring beside the awning, a slim small slim small mustard-and-salt condiment-tray along the front counter, a small slim heavy umbrella-pole rising up from one side, and slim small slim wisps of warm steam drifting up from inside the back compartment.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{soft_pretzel}",
            "description": "{soft_pretzel} is a single fresh-warmed soft New-York-style soft pretzel about a hand wide: a slim deep golden-brown twisted-knot shape with three small loops, a slim glistening glossy egg-washed surface flecked generously with large coarse white salt-crystals, a slim faint warm steam still rising from the surface, and slim small slim small faint cracks at the inner edges of the loops where the dough has just baked apart.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{slim_kitchen_tongs}",
            "description": "{slim_kitchen_tongs} is a single slim long pair of stainless-steel kitchen-tongs about a hand and a half long: a slim small slim long polished stainless-steel jaw at one end with a slim small notched-grip end, a slim small slim small slim small slim small slim small slim small slim small slim long stainless-steel handle, a slim small thumb-loop near the hinge for one-handed operation, and slim small slim small dropped-pretzel-flour residue along the lower portion of the handle.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_midtown_corner_noon}",
            "description": "{scene_midtown_corner_noon} is a busy Midtown Manhattan corner at midday in summer: a slim small slim small slim small slim small slim small slim small slim small slim wide grey sidewalk under tall slim concrete-and-glass mid-block office buildings rising up out of frame on either side, slim small slim small bright-yellow Crown Vic taxis blurring past at high speed in the deep background, slim small slim small slim small slim small slim small slim small slim small slim small slim small slim small slim small slim small slim small slim distant pedestrians crossing in both directions along the slim sidewalk in slim hot summer-clothes, slim small slim small slim small slim small slim small a slim small slim slim small overhead street-sign for 6th Avenue and a slim small slim small slim wide stoplight pole at the corner, slim small slim small slim small slim small slim small slim small slim small slim small slim small slim small slim small slim small drifting heat-haze visible above the asphalt, slim small slim small slim small slim small slim small the deep mid-day rumble of city traffic, and slim small slim small slim small slim small slim small slim small slim small slim hot bright midday sun hitting one side of the cart hard.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "time_intervals": [
              0.0,
              10.199999809265137
            ],
            "description": "{camera} is a single slow continuous handheld shot at hip-height starting on a slim insert of {soft_pretzel} being lifted out of {steam_pretzel_cart} with {slim_kitchen_tongs}, pulling back and up to a tight close-up of {pretzel_vendor}'s wide laughing smile, then drifting laterally past him as he passes the pretzel out toward an unseen customer at the right edge of frame, the yellow taxis blurring past at full speed in the background."
          },
          {
            "name": "{pretzel_vendor}",
            "time_intervals": [
              0.0,
              10.199999809265137
            ],
            "description": "{pretzel_vendor} lifts the pretzel from the steam-cart with the tongs, then turns to camera with a wide laughing smile, then passes the pretzel out toward the unseen customer."
          },
          {
            "name": "{steam_pretzel_cart}",
            "time_intervals": [
              0.0,
              10.199999809265137
            ],
            "description": "{steam_pretzel_cart} stands beside him on slim small heavy-duty wheels, slim small wisps of warm steam drifting up from the back compartment, slim small bright-yellow 'PRETZELS \u2014 $5' awning above."
          },
          {
            "name": "{soft_pretzel}",
            "time_intervals": [
              0.0,
              10.199999809265137
            ],
            "description": "{soft_pretzel} is lifted gently from the cart with tongs, a slim faint warm steam still rising from its glistening salted golden-brown twist."
          },
          {
            "name": "{slim_kitchen_tongs}",
            "time_intervals": [
              0.0,
              10.199999809265137
            ],
            "description": "{slim_kitchen_tongs} grips the pretzel firmly by the loops between the slim stainless-steel jaws."
          },
          {
            "name": "{scene_midtown_corner_noon}",
            "time_intervals": [
              0.0,
              10.199999809265137
            ],
            "description": "{scene_midtown_corner_noon} bustles around the cart in tall mid-block buildings rising up out of frame, bright-yellow taxis blurring past in the deep background, slim distant pedestrians crossing in both directions, the deep mid-day rumble of city traffic."
          }
        ],
        "summary": "On a busy Midtown Manhattan corner at midday in summer, a cheerful pretzel-cart vendor lifts a fresh-warmed soft pretzel from his small steam-cart with a slim metal tongs and hands it across to an unseen customer. Yellow taxis blur past the cart behind him."
      },
      "refs": [
        {
          "src": "data/22/refs/00_pretzel_vendor.jpg",
          "name": "{pretzel_vendor}"
        },
        {
          "src": "data/22/refs/01_steam_pretzel_cart.jpg",
          "name": "{steam_pretzel_cart}"
        },
        {
          "src": "data/22/refs/02_soft_pretzel.jpg",
          "name": "{soft_pretzel}"
        },
        {
          "src": "data/22/refs/03_slim_kitchen_tongs.jpg",
          "name": "{slim_kitchen_tongs}"
        }
      ],
      "desc": "Manhattan pretzel cart"
    },
    {
      "seq": "23",
      "video": "data/23/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.6,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                0.6
              ],
              [
                3.6,
                3.6
              ],
              [
                6.0,
                6.0
              ],
              [
                7.5,
                7.501
              ]
            ]
          },
          {
            "name": "{radium_scientist}",
            "description": "{radium_scientist} is a tall Polish-French woman in her late thirties with chin-length dark hair pinned back in a slim small low chignon, a slim small pale unlined face, sharp focused dark eyes ringed with shadow, a slim long heavy white laboratory coat with brass buttons down the front over a slim white high-collar blouse with a slim small dark brooch at the throat, slim heavy dark grey wool skirt to the floor, slim small black leather laced ankle-boots just visible, slim small clear-glass round wire-frame reading glasses pushed low on her nose, and slim small dark stains along the fingertips from radium exposure.",
            "time_intervals": [
              [
                0.6,
                3.6
              ],
              [
                6.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{glowing_radium_vial}",
            "description": "{glowing_radium_vial} is a single small slim clear-glass laboratory vial about a thumb wide containing a small amount of crystalline radium-bromide salts: a slim small thick clear-glass tube about a finger long, a small heap of slim fine pale-grey crystalline salts at the bottom glowing a faint visible eerie pale-green from within, a slim small ground-glass stopper at the top, a slim small handwritten paper-tag tied to the neck with a slim cord reading 'Ra Br\u2082 \u2014 1903', and slim small slim glowing pale-green light just barely visible around the vial in the dark.",
            "time_intervals": [
              [
                3.6,
                6.0
              ]
            ]
          },
          {
            "name": "{lead_shielded_cabinet}",
            "description": "{lead_shielded_cabinet} is a single slim heavy lead-and-mahogany shielded laboratory cabinet about three body-heights tall: a slim small mahogany outer cabinet with slim small heavy lead-plated inner door currently swung open revealing a slim small lead-lined interior shelf, slim small slim brass hinges and slim small slim brass handle, slim small slim hand-painted black warning-skull symbol on the outer door, slim small dust along the upper edges, and slim small slim heavy chains anchoring the cabinet to the wall.",
            "time_intervals": [
              [
                0.6,
                3.6
              ]
            ]
          },
          {
            "name": "{scene_belle_epoque_lab}",
            "description": "{scene_belle_epoque_lab} is the interior of an early 1900s European radium laboratory at evening: slim small dark mahogany-and-tile lab benches running the length of the room cluttered with slim small ornate brass-and-glass laboratory glassware in tall ranked rows, slim small dark leather-bound chemistry journals open in stacks beside, a single slim ornate brass-and-glass Bunsen-burner burning slim small steady blue flame on one bench, slim small heavy hanging slim brass-banded lab lamps with slim small electrical wires running along the ceiling, slim small heavy iron radiator-pipes running along one wall, slim small framed daguerreotype portraits of slim chemists on the walls, slim small drifting motes of dust catching slim warm-yellow lamplight, a slim deep cool dust-and-iron-and-faint-ozone laboratory smell, and the deep absolute hush of a private after-hours lab.",
            "time_intervals": [
              [
                0.6,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{transition}",
            "time_intervals": [
              0.0,
              0.6
            ],
            "description": "{transition} shows a slow six-tenths-of-a-second fade-up from black, the slim warm-yellow lamp-light bleeding in first across the dark mahogany lab benches."
          },
          {
            "name": "{camera}",
            "time_intervals": [
              0.6,
              3.6
            ],
            "description": "{camera} resolves out of a slow fade-up from black to a slow steadicam push-in down the lab between the cluttered glassware benches toward {radium_scientist} small at the far end before {lead_shielded_cabinet} open."
          },
          {
            "name": "{radium_scientist}",
            "time_intervals": [
              0.6,
              3.6
            ],
            "description": "{radium_scientist} stands small at the open cabinet at the far end of the lab, leaning slightly forward to peer into the darkness inside."
          },
          {
            "name": "{lead_shielded_cabinet}",
            "time_intervals": [
              0.6,
              3.6
            ],
            "description": "{lead_shielded_cabinet} stands open at the end of the lab, the slim heavy lead-plated inner door swung outward revealing the slim small lead-lined interior shelf."
          },
          {
            "name": "{scene_belle_epoque_lab}",
            "time_intervals": [
              0.6,
              10.199999809265137
            ],
            "description": "{scene_belle_epoque_lab} stretches dim and cluttered around her in dark mahogany-and-tile lab benches, slim small ornate brass-and-glass laboratory glassware in ranked rows, slim warm-yellow lamp-light catching drifting motes of dust, deep absolute hush of an after-hours lab."
          },
          {
            "name": "{transition}",
            "time_intervals": [
              3.6,
              3.6
            ],
            "description": "{transition} shows an eye-line match cut from her gaze into the dark cabinet to the tight insert of the glowing vial inside."
          },
          {
            "name": "{camera}",
            "time_intervals": [
              3.6,
              6.0
            ],
            "description": "{camera} cuts to a tight insert of {glowing_radium_vial} inside the dark cabinet interior, slim small pale-green glow visible around the small heap of crystalline salts."
          },
          {
            "name": "{glowing_radium_vial}",
            "time_intervals": [
              3.6,
              6.0
            ],
            "description": "{glowing_radium_vial} fills the tight insert inside the dark cabinet, slim small pale-green glow visible around the small heap of crystalline salts."
          },
          {
            "name": "{transition}",
            "time_intervals": [
              6.0,
              6.0
            ],
            "description": "{transition} shows a hard cut to her green-lit close-up."
          },
          {
            "name": "{camera}",
            "time_intervals": [
              6.0,
              10.199999809265137
            ],
            "description": "{camera} cuts to a tight close-up of {radium_scientist}'s face lit faintly green from below by the glow of the vial inside the cabinet, sharp focused dark eyes wide, lips slightly parted in awe."
          },
          {
            "name": "{radium_scientist}",
            "time_intervals": [
              6.0,
              10.199999809265137
            ],
            "description": "{radium_scientist}'s face fills the tight close-up lit faintly pale-green from below, sharp focused dark eyes wide, lips slightly parted in awe."
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut",
            "time_intervals": [
              7.5,
              7.501
            ]
          }
        ],
        "summary": "Inside the dim cluttered radium laboratory of an early 1900s chemistry institute, a focused scientist peers into the open doorway of a slim lead-shielded laboratory cabinet where a small glass vial of crystalline radium salts glows faintly pale-green in the darkness."
      },
      "refs": [
        {
          "src": "data/23/refs/00_radium_scientist.jpg",
          "name": "{radium_scientist}"
        },
        {
          "src": "data/23/refs/01_glowing_radium_vial.jpg",
          "name": "{glowing_radium_vial}"
        },
        {
          "src": "data/23/refs/02_lead_shielded_cabinet.jpg",
          "name": "{lead_shielded_cabinet}"
        }
      ],
      "desc": "Radium laboratory"
    }
  ],
  "long_videos": [
    {
      "seq": "01",
      "duration": 40.6,
      "video": "data/long_videos/01/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                40.599998474121094
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.719569683074951,
                2.7196102142333984
              ],
              [
                4.722858905792236,
                4.722899436950684
              ],
              [
                9.230259895324707,
                9.230300903320312
              ],
              [
                11.734371185302734,
                11.73441219329834
              ],
              [
                15.250144958496094,
                15.2501859664917
              ],
              [
                18.25507926940918,
                18.25511932373047
              ],
              [
                21.760835647583008,
                21.760875701904297
              ],
              [
                23.273319244384766,
                23.273361206054688
              ],
              [
                27.780719757080078,
                27.78076171875
              ],
              [
                30.78565216064453,
                30.785694122314453
              ],
              [
                32.29813766479492,
                32.298179626464844
              ],
              [
                34.30142593383789,
                34.30146789550781
              ],
              [
                36.30471420288086,
                36.30475616455078
              ]
            ]
          },
          {
            "name": "{man_bald}",
            "description": "{man_bald} is a middle-aged, balding man with fair skin. He is wearing a short-sleeved, pale yellow button-up shirt and a red tie with a black and white pattern.",
            "time_intervals": [
              [
                0.0,
                2.7596354484558105
              ],
              [
                4.853072643280029,
                9.260309219360352
              ],
              [
                11.864584922790527,
                15.310243606567383
              ],
              [
                23.333415985107422,
                27.74065399169922
              ],
              [
                36.39486312866211,
                39.29963302612305
              ],
              [
                39.29963302612305,
                40.599998474121094
              ]
            ]
          },
          {
            "name": "{woman_blonde}",
            "description": "{woman_blonde} is a woman with blonde hair tied back in a ponytail with a pink scarf. She is wearing a sleeveless pink, red, and white floral dress, a multi-strand pearl necklace, and small pearl earrings.",
            "time_intervals": [
              [
                2.7596354484558105,
                4.853072643280029
              ],
              [
                21.911083221435547,
                23.333415985107422
              ],
              [
                32.36825180053711,
                34.31144332885742
              ],
              [
                39.29963302612305,
                40.599998474121094
              ]
            ]
          },
          {
            "name": "{man_dark_hair}",
            "description": "{man_dark_hair} is a man with medium-length, dark brown, wavy hair. He is wearing a short-sleeved white button-up shirt and a black tie.",
            "time_intervals": [
              [
                2.7596354484558105,
                4.853072643280029
              ],
              [
                15.380358695983887,
                18.25507926940918
              ],
              [
                34.31144332885742,
                36.39486312866211
              ]
            ]
          },
          {
            "name": "{man_cook}",
            "description": "{man_cook} is a man with short, dark hair. He is wearing a light-colored, long-sleeved shirt under a dark, stained apron.",
            "time_intervals": [
              [
                18.25507926940918,
                21.850982666015625
              ],
              [
                27.74065399169922,
                30.755603790283203
              ]
            ]
          },
          {
            "name": "{patties_grilling}",
            "description": "{patties_grilling} are two round, browning meat patties cooking on a black grill grate over glowing red coals.",
            "time_intervals": [
              [
                9.260309219360352,
                11.864584922790527
              ]
            ]
          },
          {
            "name": "{earring_gold}",
            "description": "{earring_gold} is a small, gold-colored earring with a pearl.",
            "time_intervals": [
              [
                30.755603790283203,
                32.36825180053711
              ]
            ]
          },
          {
            "name": "{scene_backyard}",
            "description": "{scene_backyard} is an outdoor area with a large, weathered concrete wall, a wooden fence, and various pieces of junk like wooden pallets and a large metal drum. The ground is dirt and sparse grass.",
            "time_intervals": [
              [
                0.0,
                40.599998474121094
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{man_bald}",
            "description": "{man_bald} sits at the table and continues talking, looking slightly to his left.",
            "time_intervals": [
              0.0,
              2.7596354484558105
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} remains static in a series of cuts between different characters and objects, including close-ups and wider shots of the group.",
            "time_intervals": [
              0.0,
              40.599998474121094
            ]
          },
          {
            "name": "{scene_backyard}",
            "description": "{scene_backyard} is visible in the background throughout the video.",
            "time_intervals": [
              0.0,
              40.599998474121094
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              2.719569683074951,
              2.7196102142333984
            ]
          },
          {
            "name": "{woman_blonde}",
            "description": "{woman_blonde} sits at the table, looking towards {man_dark_hair} who is standing beside her and talking.",
            "time_intervals": [
              2.7596354484558105,
              4.853072643280029
            ]
          },
          {
            "name": "{man_dark_hair}",
            "description": "{man_dark_hair} stands next to {woman_blonde}, looking down at her as he talks.",
            "time_intervals": [
              2.7596354484558105,
              4.853072643280029
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              4.722858905792236,
              4.722899436950684
            ]
          },
          {
            "name": "{man_bald}",
            "description": "{man_bald} continues his conversation, looking around slightly and moving his mouth as he speaks.",
            "time_intervals": [
              4.853072643280029,
              9.260309219360352
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              9.230259895324707,
              9.230300903320312
            ]
          },
          {
            "name": "{patties_grilling}",
            "description": "{patties_grilling} are on a grill; one is flipped with a spatula, and then a flare-up of flames engulfs them.",
            "time_intervals": [
              9.260309219360352,
              11.864584922790527
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              11.734371185302734,
              11.73441219329834
            ]
          },
          {
            "name": "{man_bald}",
            "description": "{man_bald} continues speaking, eventually smiling and laughing while looking to his left.",
            "time_intervals": [
              11.864584922790527,
              15.310243606567383
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              15.250144958496094,
              15.2501859664917
            ]
          },
          {
            "name": "{man_dark_hair}",
            "description": "{man_dark_hair} stands at the table, talking and adjusting his black tie.",
            "time_intervals": [
              15.380358695983887,
              18.25507926940918
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              18.25507926940918,
              18.25511932373047
            ]
          },
          {
            "name": "{man_cook}",
            "description": "{man_cook} stands near a grill, picks up a piece of food, and eats it.",
            "time_intervals": [
              18.25507926940918,
              21.850982666015625
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              21.760835647583008,
              21.760875701904297
            ]
          },
          {
            "name": "{woman_blonde}",
            "description": "{woman_blonde} is shown in profile, sitting in her chair and looking to her right.",
            "time_intervals": [
              21.911083221435547,
              23.333415985107422
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              23.273319244384766,
              23.273361206054688
            ]
          },
          {
            "name": "{man_bald}",
            "description": "{man_bald} sits at the table, speaking and looking around with a serious expression.",
            "time_intervals": [
              23.333415985107422,
              27.74065399169922
            ]
          },
          {
            "name": "{man_cook}",
            "description": "{man_cook} stands near the grill, holding a piece of bread, looks at it, and then drops it.",
            "time_intervals": [
              27.74065399169922,
              30.755603790283203
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              27.780719757080078,
              27.78076171875
            ]
          },
          {
            "name": "{earring_gold}",
            "description": "{earring_gold} lies on the dirt and gravel ground.",
            "time_intervals": [
              30.755603790283203,
              32.36825180053711
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              30.78565216064453,
              30.785694122314453
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              32.29813766479492,
              32.298179626464844
            ]
          },
          {
            "name": "{woman_blonde}",
            "description": "{woman_blonde} looks to her right, then turns her head to face forward with a concerned expression.",
            "time_intervals": [
              32.36825180053711,
              34.31144332885742
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              34.30142593383789,
              34.30146789550781
            ]
          },
          {
            "name": "{man_dark_hair}",
            "description": "{man_dark_hair} sits outdoors, talking and looking slightly to his left.",
            "time_intervals": [
              34.31144332885742,
              36.39486312866211
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              36.30471420288086,
              36.30475616455078
            ]
          },
          {
            "name": "{man_bald}",
            "description": "{man_bald} appears in a close-up shot, talking animatedly with a sweaty face.",
            "time_intervals": [
              36.39486312866211,
              39.29963302612305
            ]
          },
          {
            "name": "{man_bald}",
            "description": "{man_bald} sits at the table with {woman_young}, {woman_blonde}, and {man_dark_hair}, talking and gesturing with a green cup towards {woman_young}.",
            "time_intervals": [
              39.29963302612305,
              40.599998474121094
            ]
          },
          {
            "name": "{woman_blonde}",
            "description": "{woman_blonde} sits at the table across from {man_bald}, listening to the conversation.",
            "time_intervals": [
              39.29963302612305,
              40.599998474121094
            ]
          }
        ],
        "data_id": "14618c040e2ec14f5d0157202a760b5a",
        "frame_timestamps": [
          9.664895940355322,
          9.731562607021988,
          9.798229273688655,
          9.864895940355321,
          9.93156260702199,
          9.998229273688656,
          10.064895940355322,
          10.131562607021989,
          10.198229273688655,
          10.264895940355322,
          10.331562607021988,
          10.398229273688655,
          10.464895940355323,
          10.53156260702199,
          10.598229273688656,
          10.664895940355322,
          10.731562607021988,
          10.798229273688655,
          10.864895940355321,
          10.931562607021988,
          10.998229273688656,
          11.064895940355322,
          11.131562607021989,
          11.198229273688655,
          11.264895940355322,
          11.331562607021988,
          11.398229273688656,
          11.464895940355323,
          11.53156260702199,
          11.598229273688656,
          11.664895940355322,
          11.731562607021988,
          11.798229273688655,
          11.864895940355321,
          11.931562607021988,
          11.998229273688656,
          12.064895940355322,
          12.131562607021989,
          12.198229273688655,
          12.264895940355322,
          12.331562607021988,
          12.398229273688656,
          12.464895940355323,
          12.53156260702199,
          12.598229273688656,
          12.664895940355322,
          12.731562607021988,
          12.798229273688655,
          12.864895940355321,
          12.931562607021988,
          12.998229273688656,
          13.064895940355322,
          13.131562607021989,
          13.198229273688655,
          13.264895940355322,
          13.331562607021988,
          13.398229273688656,
          13.464895940355323,
          13.53156260702199,
          13.598229273688656,
          13.664895940355322,
          13.731562607021988,
          13.798229273688655,
          13.864895940355321,
          13.931562607021988,
          13.998229273688654,
          14.064895940355322,
          14.131562607021989,
          14.198229273688655,
          14.264895940355322,
          14.33156260702199,
          14.398229273688656,
          14.464895940355323,
          14.53156260702199,
          14.598229273688656,
          14.664895940355322,
          14.731562607021988,
          14.798229273688655,
          14.864895940355321,
          14.931562607021988,
          14.998229273688654,
          15.064895940355322,
          15.131562607021989,
          15.198229273688655,
          15.264895940355322,
          15.33156260702199,
          15.398229273688656,
          15.464895940355323,
          15.53156260702199,
          15.598229273688656,
          15.664895940355322,
          15.731562607021988,
          15.798229273688655,
          15.864895940355321,
          15.931562607021988,
          15.998229273688654,
          16.06489594035532,
          16.13156260702199,
          16.198229273688654,
          16.264895940355323,
          16.33156260702199,
          16.398229273688656,
          16.464895940355323,
          16.53156260702199,
          16.598229273688656,
          16.664895940355322,
          16.73156260702199,
          16.798229273688655,
          16.86489594035532,
          16.931562607021988,
          16.998229273688654,
          17.06489594035532,
          17.13156260702199,
          17.198229273688654,
          17.264895940355323,
          17.33156260702199,
          17.398229273688656,
          17.464895940355323,
          17.53156260702199,
          17.598229273688656,
          17.664895940355322,
          17.73156260702199,
          17.798229273688655,
          17.86489594035532,
          17.931562607021988,
          17.998229273688658,
          18.06489594035532,
          18.13156260702199,
          18.198229273688654,
          18.264895940355323,
          18.331562607021986,
          18.398229273688656,
          18.464895940355323,
          18.53156260702199,
          18.598229273688656,
          18.664895940355322,
          18.73156260702199,
          18.798229273688655,
          18.86489594035532,
          18.931562607021988,
          18.998229273688658,
          19.06489594035532,
          19.13156260702199,
          19.198229273688654,
          19.264895940355323,
          19.331562607021986,
          19.398229273688656,
          19.464895940355323,
          19.53156260702199,
          19.598229273688656,
          19.664895940355322,
          19.73156260702199,
          19.798229273688655,
          19.86489594035532,
          19.931562607021988,
          19.998229273688658,
          20.06489594035532,
          20.13156260702199,
          20.198229273688654,
          20.264895940355323,
          20.331562607021986,
          20.398229273688656,
          20.464895940355323,
          20.53156260702199,
          20.598229273688656,
          20.664895940355322,
          20.73156260702199,
          20.798229273688655,
          20.86489594035532,
          20.931562607021988,
          20.998229273688658,
          21.06489594035532,
          21.13156260702199,
          21.198229273688654,
          21.264895940355323,
          21.331562607021986,
          21.398229273688656,
          21.464895940355323,
          21.53156260702199,
          21.598229273688656,
          21.664895940355322,
          21.73156260702199,
          21.798229273688655,
          21.86489594035532,
          21.931562607021988,
          21.998229273688658,
          22.06489594035532,
          22.13156260702199,
          22.198229273688654,
          22.264895940355323,
          22.331562607021986,
          22.398229273688656,
          22.464895940355323,
          22.53156260702199,
          22.598229273688656,
          22.664895940355322,
          22.73156260702199,
          22.798229273688655,
          22.86489594035532,
          22.931562607021988,
          22.998229273688658,
          23.06489594035532,
          23.13156260702199,
          23.198229273688654,
          23.264895940355323,
          23.331562607021986,
          23.398229273688656,
          23.46489594035532,
          23.53156260702199,
          23.598229273688656,
          23.664895940355322,
          23.73156260702199,
          23.798229273688655,
          23.86489594035532,
          23.931562607021988,
          23.998229273688658,
          24.06489594035532,
          24.13156260702199,
          24.198229273688654,
          24.264895940355323,
          24.331562607021986,
          24.398229273688656,
          24.46489594035532,
          24.53156260702199,
          24.598229273688656,
          24.664895940355322,
          24.73156260702199,
          24.798229273688655,
          24.86489594035532,
          24.931562607021988,
          24.998229273688658,
          25.06489594035532,
          25.13156260702199,
          25.198229273688654,
          25.264895940355323,
          25.331562607021986,
          25.398229273688656,
          25.46489594035532,
          25.53156260702199,
          25.598229273688656,
          25.664895940355322,
          25.73156260702199,
          25.798229273688655,
          25.86489594035532,
          25.931562607021988,
          25.998229273688654,
          26.06489594035532,
          26.131562607021987,
          26.198229273688654,
          26.264895940355323,
          26.33156260702199,
          26.398229273688656,
          26.464895940355323,
          26.53156260702199,
          26.598229273688656,
          26.664895940355322,
          26.73156260702199,
          26.798229273688655,
          26.86489594035532,
          26.931562607021988,
          26.998229273688654,
          27.06489594035532,
          27.131562607021987,
          27.198229273688654,
          27.264895940355323,
          27.33156260702199,
          27.398229273688656,
          27.464895940355323,
          27.53156260702199,
          27.598229273688656,
          27.664895940355322,
          27.73156260702199,
          27.798229273688655,
          27.86489594035532,
          27.931562607021988,
          27.998229273688654,
          28.06489594035532,
          28.131562607021987,
          28.198229273688654,
          28.264895940355323,
          28.33156260702199,
          28.398229273688656,
          28.464895940355323,
          28.53156260702199,
          28.598229273688656,
          28.664895940355322,
          28.73156260702199,
          28.798229273688655,
          28.86489594035532,
          28.931562607021988,
          28.998229273688654,
          29.06489594035532,
          29.131562607021987,
          29.198229273688654,
          29.264895940355323,
          29.33156260702199,
          29.398229273688656,
          29.464895940355323,
          29.53156260702199,
          29.598229273688656,
          29.664895940355322,
          29.73156260702199,
          29.798229273688655,
          29.86489594035532,
          29.931562607021988,
          29.998229273688654,
          30.06489594035532,
          30.131562607021987,
          30.198229273688654,
          30.264895940355323,
          30.33156260702199,
          30.398229273688656,
          30.464895940355323,
          30.53156260702199,
          30.598229273688656,
          30.664895940355322,
          30.73156260702199,
          30.798229273688655,
          30.86489594035532,
          30.931562607021988,
          30.998229273688654,
          31.06489594035532,
          31.131562607021987,
          31.198229273688654,
          31.264895940355323,
          31.33156260702199,
          31.398229273688656,
          31.464895940355323,
          31.53156260702199,
          31.598229273688656,
          31.664895940355322,
          31.73156260702199,
          31.798229273688655,
          31.86489594035532,
          31.931562607021988,
          31.998229273688654,
          32.06489594035532,
          32.13156260702199,
          32.19822927368865,
          32.26489594035532,
          32.33156260702199,
          32.398229273688656,
          32.46489594035532,
          32.53156260702199,
          32.59822927368866,
          32.66489594035532,
          32.731562607021985,
          32.798229273688655,
          32.864895940355325,
          32.93156260702199,
          32.99822927368865,
          33.06489594035532,
          33.13156260702199,
          33.19822927368865,
          33.26489594035532,
          33.33156260702199,
          33.398229273688656,
          33.46489594035532,
          33.53156260702199,
          33.59822927368866,
          33.66489594035532,
          33.731562607021985,
          33.798229273688655,
          33.864895940355325,
          33.93156260702199,
          33.99822927368865,
          34.06489594035532,
          34.13156260702199,
          34.19822927368865,
          34.26489594035532,
          34.33156260702199,
          34.398229273688656,
          34.46489594035532,
          34.53156260702199,
          34.59822927368866,
          34.66489594035532,
          34.731562607021985,
          34.798229273688655,
          34.864895940355325,
          34.93156260702199,
          34.99822927368865,
          35.06489594035532,
          35.13156260702199,
          35.19822927368865,
          35.26489594035532,
          35.33156260702199,
          35.398229273688656,
          35.46489594035532,
          35.53156260702199,
          35.59822927368866,
          35.66489594035532,
          35.731562607021985,
          35.798229273688655,
          35.864895940355325,
          35.93156260702199,
          35.99822927368865,
          36.06489594035532,
          36.13156260702199,
          36.19822927368865,
          36.264895940355316,
          36.33156260702199,
          36.398229273688656,
          36.46489594035532,
          36.53156260702199,
          36.59822927368866,
          36.66489594035532,
          36.731562607021985,
          36.798229273688655,
          36.864895940355325,
          36.93156260702199,
          36.99822927368865,
          37.06489594035532,
          37.13156260702199,
          37.19822927368865,
          37.264895940355316,
          37.33156260702199,
          37.398229273688656,
          37.46489594035532,
          37.53156260702199,
          37.59822927368866,
          37.66489594035532,
          37.731562607021985,
          37.798229273688655,
          37.864895940355325,
          37.93156260702199,
          37.99822927368865,
          38.06489594035532,
          38.13156260702199,
          38.19822927368865,
          38.264895940355316,
          38.33156260702199,
          38.398229273688656,
          38.46489594035532,
          38.53156260702199,
          38.59822927368866,
          38.66489594035532,
          38.731562607021985,
          38.798229273688655,
          38.864895940355325,
          38.93156260702199,
          38.99822927368865,
          39.06489594035532,
          39.13156260702199,
          39.19822927368865,
          39.264895940355316,
          39.33156260702199,
          39.398229273688656,
          39.46489594035532,
          39.53156260702199,
          39.59822927368866,
          39.66489594035532,
          39.731562607021985,
          39.798229273688655,
          39.864895940355325,
          39.93156260702199,
          39.99822927368865,
          40.06489594035532,
          40.13156260702199,
          40.19822927368865,
          40.264895940355316,
          40.33156260702199,
          40.398229273688656,
          40.46489594035532,
          40.53156260702199,
          40.59822927368866,
          40.66489594035532,
          40.731562607021985,
          40.798229273688655,
          40.864895940355325,
          40.93156260702199,
          40.99822927368865,
          41.06489594035532,
          41.13156260702199,
          41.19822927368865,
          41.264895940355316,
          41.33156260702199,
          41.398229273688656,
          41.46489594035532,
          41.53156260702199,
          41.59822927368866,
          41.66489594035532,
          41.731562607021985,
          41.798229273688655,
          41.864895940355325,
          41.93156260702199,
          41.99822927368866,
          42.06489594035532,
          42.13156260702199,
          42.19822927368865,
          42.26489594035532,
          42.331562607021986,
          42.398229273688656,
          42.46489594035532,
          42.53156260702199,
          42.59822927368865,
          42.66489594035532,
          42.731562607021985,
          42.798229273688655,
          42.864895940355325,
          42.93156260702199,
          42.99822927368866,
          43.06489594035532,
          43.13156260702199,
          43.19822927368865,
          43.26489594035532,
          43.331562607021986,
          43.398229273688656,
          43.46489594035532,
          43.53156260702199,
          43.59822927368865,
          43.66489594035532,
          43.731562607021985,
          43.798229273688655,
          43.864895940355325,
          43.93156260702199,
          43.99822927368866,
          44.06489594035532,
          44.13156260702199,
          44.19822927368865,
          44.26489594035532,
          44.331562607021986,
          44.398229273688656,
          44.46489594035532,
          44.53156260702199,
          44.59822927368865,
          44.66489594035532,
          44.731562607021985,
          44.798229273688655,
          44.864895940355325,
          44.93156260702199,
          44.99822927368866,
          45.06489594035532,
          45.13156260702199,
          45.19822927368865,
          45.26489594035532,
          45.331562607021986,
          45.398229273688656,
          45.46489594035532,
          45.53156260702199,
          45.59822927368865,
          45.66489594035532,
          45.731562607021985,
          45.798229273688655,
          45.864895940355325,
          45.93156260702199,
          45.99822927368866,
          46.06489594035532,
          46.13156260702199,
          46.19822927368865,
          46.26489594035532,
          46.331562607021986,
          46.398229273688656,
          46.46489594035532,
          46.53156260702199,
          46.59822927368865,
          46.66489594035532,
          46.731562607021985,
          46.798229273688655,
          46.864895940355325,
          46.93156260702199,
          46.99822927368866,
          47.06489594035532,
          47.13156260702199,
          47.19822927368865,
          47.26489594035532,
          47.331562607021986,
          47.398229273688656,
          47.46489594035532,
          47.53156260702199,
          47.59822927368865,
          47.66489594035532,
          47.731562607021985,
          47.798229273688655,
          47.864895940355325,
          47.93156260702199,
          47.99822927368866,
          48.06489594035532,
          48.13156260702199,
          48.19822927368865,
          48.26489594035532,
          48.331562607021986,
          48.398229273688656,
          48.46489594035532,
          48.53156260702199,
          48.59822927368865,
          48.66489594035532,
          48.731562607021985,
          48.798229273688655,
          48.864895940355325,
          48.93156260702199,
          48.99822927368866,
          49.06489594035532,
          49.13156260702199,
          49.19822927368865,
          49.26489594035532,
          49.331562607021986,
          49.398229273688656,
          49.46489594035532,
          49.53156260702199,
          49.59822927368865,
          49.66489594035532,
          49.731562607021985,
          49.798229273688655,
          49.864895940355325,
          49.93156260702199,
          49.99822927368866,
          50.06489594035532,
          50.13156260702199,
          50.19822927368865
        ]
      },
      "refs": [
        {
          "src": "data/long_videos/01/refs/00_{man_bald}.jpg",
          "name": "{man_bald}"
        },
        {
          "src": "data/long_videos/01/refs/01_{woman_blonde}.jpg",
          "name": "{woman_blonde}"
        },
        {
          "src": "data/long_videos/01/refs/02_{man_dark_hair}.jpg",
          "name": "{man_dark_hair}"
        },
        {
          "src": "data/long_videos/01/refs/03_{man_cook}.jpg",
          "name": "{man_cook}"
        }
      ],
      "desc": "Backyard BBQ"
    },
    {
      "seq": "02",
      "duration": 40.6,
      "video": "data/long_videos/02/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                1.7288899421691895
              ],
              [
                1.7288899421691895,
                3.2313570976257324
              ],
              [
                3.2313570976257324,
                11.545007705688477
              ],
              [
                11.545007705688477,
                14.149284362792969
              ],
              [
                14.149284362792969,
                23.995450973510742
              ],
              [
                23.995450973510742,
                29.63471031188965
              ],
              [
                29.63471031188965,
                36.64622497558594
              ],
              [
                36.64622497558594,
                37.74803161621094
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                1.7288899421691895,
                1.7289304733276367
              ],
              [
                3.2313570976257324,
                3.231397867202759
              ],
              [
                11.74533748626709,
                11.745378494262695
              ],
              [
                14.249448776245117,
                14.249490737915039
              ],
              [
                24.26589584350586,
                24.26593589782715
              ],
              [
                29.77494239807129,
                29.774982452392578
              ]
            ]
          },
          {
            "name": "{man_judge}",
            "description": "{man_judge} is an elderly, fair-skinned man with a full white beard and mustache. He has expressive, wide eyes and is wearing a dark, wrapped turban, a white and grey patterned tunic, and a brown, patterned shawl draped over his shoulders. He is holding a gnarled wooden staff.",
            "time_intervals": [
              [
                0.0,
                1.7288899421691895
              ],
              [
                3.2313570976257324,
                11.545007705688477
              ],
              [
                14.149284362792969,
                17.254383087158203
              ],
              [
                17.254383087158203,
                21.060632705688477
              ],
              [
                21.060632705688477,
                23.995450973510742
              ],
              [
                29.63471031188965,
                32.279052734375
              ],
              [
                32.279052734375,
                36.64622497558594
              ]
            ]
          },
          {
            "name": "{man_blue_robe}",
            "description": "{man_blue_robe} is a man with a medium complexion and a serious expression. He is wearing a layered head covering with a beige band over a brown cloth, and a blue vest over a dark green tunic and a brown shawl.",
            "time_intervals": [
              [
                1.7288899421691895,
                3.2313570976257324
              ],
              [
                11.545007705688477,
                12.246158599853516
              ],
              [
                12.246158599853516,
                14.149284362792969
              ],
              [
                23.995450973510742,
                29.63471031188965
              ],
              [
                36.64622497558594,
                37.74803161621094
              ]
            ]
          },
          {
            "name": "{man_teal_robe}",
            "description": "{man_teal_robe} is a man with a medium complexion and a full black beard and mustache. He is wearing a dark blue, patterned turban and a shiny, vertically striped teal robe with gold accents.",
            "time_intervals": [
              [
                1.7288899421691895,
                2.590304374694824
              ],
              [
                2.590304374694824,
                3.2313570976257324
              ],
              [
                11.545007705688477,
                14.149284362792969
              ],
              [
                23.995450973510742,
                27.07050132751465
              ],
              [
                27.07050132751465,
                29.63471031188965
              ]
            ]
          },
          {
            "name": "{scene_courtyard}",
            "description": "{scene_courtyard} consists of a setting with aged, grey brick or stone walls, providing a historical or traditional backdrop for the conversation. The background remains consistently out of focus.",
            "time_intervals": [
              [
                0.0,
                40.599998474121094
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} cuts back to a static close-up of {man_judge}.",
            "time_intervals": [
              0.0,
              1.7288899421691895
            ]
          },
          {
            "name": "{man_judge}",
            "description": "{man_judge} continues speaking, his expression serious, and he brings his right hand towards his chest while talking.",
            "time_intervals": [
              0.0,
              1.7288899421691895
            ]
          },
          {
            "name": "{scene_courtyard}",
            "description": "{scene_courtyard} is visible as the background throughout the video.",
            "time_intervals": [
              0.0,
              40.599998474121094
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              1.7288899421691895,
              1.7289304733276367
            ]
          },
          {
            "name": "{man_teal_robe}",
            "description": "{man_teal_robe} looks down and to his left with a subtle smile.",
            "time_intervals": [
              1.7288899421691895,
              2.590304374694824
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts back to the static medium shot of {man_blue_robe} and {man_teal_robe}.",
            "time_intervals": [
              1.7288899421691895,
              3.2313570976257324
            ]
          },
          {
            "name": "{man_blue_robe}",
            "description": "{man_blue_robe} is shown again, his expression unchanged as he listens.",
            "time_intervals": [
              1.7288899421691895,
              3.2313570976257324
            ]
          },
          {
            "name": "{man_teal_robe}",
            "description": "{man_teal_robe} looks up slightly, his expression becoming more neutral as he listens.",
            "time_intervals": [
              2.590304374694824,
              3.2313570976257324
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              3.2313570976257324,
              3.231397867202759
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts back to the static close-up of {man_judge}.",
            "time_intervals": [
              3.2313570976257324,
              11.545007705688477
            ]
          },
          {
            "name": "{man_judge}",
            "description": "{man_judge} is shown speaking with an earnest expression, looking up and gesturing with his right hand, a ring visible on his finger.",
            "time_intervals": [
              3.2313570976257324,
              11.545007705688477
            ]
          },
          {
            "name": "{man_blue_robe}",
            "description": "{man_blue_robe} looks down and to his right, a slight smile forming on his face.",
            "time_intervals": [
              11.545007705688477,
              12.246158599853516
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts back to the static medium shot of {man_blue_robe} and {man_teal_robe}.",
            "time_intervals": [
              11.545007705688477,
              14.149284362792969
            ]
          },
          {
            "name": "{man_teal_robe}",
            "description": "{man_teal_robe} listens to {man_blue_robe}, his gaze directed towards him.",
            "time_intervals": [
              11.545007705688477,
              14.149284362792969
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              11.74533748626709,
              11.745378494262695
            ]
          },
          {
            "name": "{man_blue_robe}",
            "description": "{man_blue_robe} looks up at {man_teal_robe} and begins to speak, gesturing with his right hand towards {man_teal_robe}.",
            "time_intervals": [
              12.246158599853516,
              14.149284362792969
            ]
          },
          {
            "name": "{man_judge}",
            "description": "{man_judge} continues his speech, looking forward and gesturing with his right hand to emphasize his point.",
            "time_intervals": [
              14.149284362792969,
              17.254383087158203
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts back to the static close-up of {man_judge}.",
            "time_intervals": [
              14.149284362792969,
              23.995450973510742
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              14.249448776245117,
              14.249490737915039
            ]
          },
          {
            "name": "{man_judge}",
            "description": "{man_judge} keeps speaking, waving his right hand while looking at the person he is addressing.",
            "time_intervals": [
              17.254383087158203,
              21.060632705688477
            ]
          },
          {
            "name": "{man_judge}",
            "description": "{man_judge} continues speaking, gesturing with his right hand and maintaining a serious, admonishing expression.",
            "time_intervals": [
              21.060632705688477,
              23.995450973510742
            ]
          },
          {
            "name": "{man_teal_robe}",
            "description": "{man_teal_robe} begins speaking, looking forward with a serious expression and gesturing with his right hand.",
            "time_intervals": [
              23.995450973510742,
              27.07050132751465
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts back to the static medium shot of {man_blue_robe} and {man_teal_robe}.",
            "time_intervals": [
              23.995450973510742,
              29.63471031188965
            ]
          },
          {
            "name": "{man_blue_robe}",
            "description": "{man_blue_robe} stands listening intently to {man_teal_robe}, his expression serious and his gaze fixed forward.",
            "time_intervals": [
              23.995450973510742,
              29.63471031188965
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              24.26589584350586,
              24.26593589782715
            ]
          },
          {
            "name": "{man_teal_robe}",
            "description": "{man_teal_robe} continues to speak, turning his head slightly to his left and gesturing with his right hand.",
            "time_intervals": [
              27.07050132751465,
              29.63471031188965
            ]
          },
          {
            "name": "{man_judge}",
            "description": "{man_judge} resumes speaking, looking forward and gesturing with his right hand.",
            "time_intervals": [
              29.63471031188965,
              32.279052734375
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts back to the static close-up of {man_judge}.",
            "time_intervals": [
              29.63471031188965,
              36.64622497558594
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              29.77494239807129,
              29.774982452392578
            ]
          },
          {
            "name": "{man_judge}",
            "description": "{man_judge} continues his speech, his expression intense, gesturing with his hand for emphasis.",
            "time_intervals": [
              32.279052734375,
              36.64622497558594
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts back to the static medium shot of {man_blue_robe} and {man_teal_robe}.",
            "time_intervals": [
              36.64622497558594,
              37.74803161621094
            ]
          },
          {
            "name": "{man_blue_robe}",
            "description": "{man_blue_robe} stands still, looking forward with a serious expression.",
            "time_intervals": [
              36.64622497558594,
              37.74803161621094
            ]
          }
        ],
        "data_id": "9a80e952cec35a3e277113ffca6312b7",
        "frame_timestamps": [
          8.773948803924473,
          8.840615470591139,
          8.907282137257805,
          8.973948803924472,
          9.04061547059114,
          9.107282137257807,
          9.173948803924473,
          9.24061547059114,
          9.307282137257806,
          9.373948803924472,
          9.440615470591139,
          9.507282137257805,
          9.573948803924473,
          9.64061547059114,
          9.707282137257806,
          9.773948803924473,
          9.840615470591139,
          9.907282137257805,
          9.973948803924472,
          10.040615470591138,
          10.107282137257807,
          10.173948803924473,
          10.24061547059114,
          10.307282137257806,
          10.373948803924472,
          10.440615470591139,
          10.507282137257807,
          10.573948803924473,
          10.64061547059114,
          10.707282137257806,
          10.773948803924473,
          10.840615470591139,
          10.907282137257805,
          10.973948803924472,
          11.040615470591138,
          11.107282137257807,
          11.173948803924473,
          11.24061547059114,
          11.307282137257806,
          11.373948803924472,
          11.440615470591139,
          11.507282137257807,
          11.573948803924473,
          11.64061547059114,
          11.707282137257806,
          11.773948803924473,
          11.840615470591139,
          11.907282137257805,
          11.973948803924472,
          12.040615470591138,
          12.107282137257807,
          12.173948803924473,
          12.24061547059114,
          12.307282137257806,
          12.373948803924472,
          12.440615470591139,
          12.507282137257807,
          12.573948803924473,
          12.64061547059114,
          12.707282137257806,
          12.773948803924473,
          12.840615470591139,
          12.907282137257805,
          12.973948803924472,
          13.040615470591138,
          13.107282137257805,
          13.173948803924473,
          13.24061547059114,
          13.307282137257806,
          13.373948803924472,
          13.44061547059114,
          13.507282137257807,
          13.573948803924473,
          13.64061547059114,
          13.707282137257806,
          13.773948803924473,
          13.840615470591139,
          13.907282137257805,
          13.973948803924472,
          14.040615470591138,
          14.107282137257805,
          14.173948803924473,
          14.24061547059114,
          14.307282137257806,
          14.373948803924472,
          14.44061547059114,
          14.507282137257807,
          14.573948803924473,
          14.64061547059114,
          14.707282137257806,
          14.773948803924473,
          14.840615470591139,
          14.907282137257805,
          14.973948803924472,
          15.040615470591138,
          15.107282137257805,
          15.173948803924473,
          15.24061547059114,
          15.307282137257806,
          15.373948803924472,
          15.44061547059114,
          15.507282137257807,
          15.573948803924473,
          15.64061547059114,
          15.707282137257806,
          15.773948803924473,
          15.840615470591139,
          15.907282137257805,
          15.973948803924472,
          16.04061547059114,
          16.107282137257805,
          16.17394880392447,
          16.240615470591138,
          16.307282137257808,
          16.37394880392447,
          16.44061547059114,
          16.507282137257807,
          16.573948803924473,
          16.64061547059114,
          16.707282137257806,
          16.773948803924473,
          16.84061547059114,
          16.907282137257805,
          16.973948803924472,
          17.04061547059114,
          17.107282137257805,
          17.173948803924475,
          17.240615470591138,
          17.307282137257808,
          17.37394880392447,
          17.44061547059114,
          17.507282137257803,
          17.573948803924473,
          17.64061547059114,
          17.707282137257806,
          17.773948803924473,
          17.84061547059114,
          17.907282137257805,
          17.973948803924472,
          18.04061547059114,
          18.107282137257805,
          18.173948803924475,
          18.240615470591138,
          18.307282137257808,
          18.37394880392447,
          18.44061547059114,
          18.507282137257803,
          18.573948803924473,
          18.64061547059114,
          18.707282137257806,
          18.773948803924473,
          18.84061547059114,
          18.907282137257805,
          18.973948803924472,
          19.04061547059114,
          19.107282137257805,
          19.173948803924475,
          19.240615470591138,
          19.307282137257808,
          19.37394880392447,
          19.44061547059114,
          19.507282137257803,
          19.573948803924473,
          19.64061547059114,
          19.707282137257806,
          19.773948803924473,
          19.84061547059114,
          19.907282137257805,
          19.973948803924472,
          20.04061547059114,
          20.107282137257805,
          20.173948803924475,
          20.240615470591138,
          20.307282137257808,
          20.37394880392447,
          20.44061547059114,
          20.507282137257803,
          20.573948803924473,
          20.64061547059114,
          20.707282137257806,
          20.773948803924473,
          20.84061547059114,
          20.907282137257805,
          20.973948803924472,
          21.04061547059114,
          21.107282137257805,
          21.173948803924475,
          21.240615470591138,
          21.307282137257808,
          21.37394880392447,
          21.44061547059114,
          21.507282137257803,
          21.573948803924473,
          21.64061547059114,
          21.707282137257806,
          21.773948803924473,
          21.84061547059114,
          21.907282137257805,
          21.973948803924472,
          22.04061547059114,
          22.107282137257805,
          22.173948803924475,
          22.240615470591138,
          22.307282137257808,
          22.37394880392447,
          22.44061547059114,
          22.507282137257803,
          22.573948803924473,
          22.64061547059114,
          22.707282137257806,
          22.773948803924473,
          22.84061547059114,
          22.907282137257805,
          22.973948803924472,
          23.04061547059114,
          23.107282137257805,
          23.173948803924475,
          23.240615470591138,
          23.307282137257808,
          23.37394880392447,
          23.44061547059114,
          23.507282137257803,
          23.573948803924473,
          23.64061547059114,
          23.707282137257806,
          23.773948803924473,
          23.84061547059114,
          23.907282137257805,
          23.973948803924472,
          24.04061547059114,
          24.107282137257805,
          24.173948803924475,
          24.240615470591138,
          24.307282137257808,
          24.37394880392447,
          24.44061547059114,
          24.507282137257803,
          24.573948803924473,
          24.64061547059114,
          24.707282137257806,
          24.773948803924473,
          24.84061547059114,
          24.907282137257805,
          24.973948803924472,
          25.04061547059114,
          25.107282137257805,
          25.17394880392447,
          25.240615470591138,
          25.307282137257804,
          25.373948803924474,
          25.44061547059114,
          25.507282137257807,
          25.573948803924473,
          25.64061547059114,
          25.707282137257806,
          25.773948803924473,
          25.84061547059114,
          25.907282137257805,
          25.973948803924472,
          26.04061547059114,
          26.107282137257805,
          26.17394880392447,
          26.240615470591138,
          26.307282137257804,
          26.373948803924474,
          26.44061547059114,
          26.507282137257807,
          26.573948803924473,
          26.64061547059114,
          26.707282137257806,
          26.773948803924473,
          26.84061547059114,
          26.907282137257805,
          26.973948803924472,
          27.04061547059114,
          27.107282137257805,
          27.17394880392447,
          27.240615470591138,
          27.307282137257804,
          27.373948803924474,
          27.44061547059114,
          27.507282137257807,
          27.573948803924473,
          27.64061547059114,
          27.707282137257806,
          27.773948803924473,
          27.84061547059114,
          27.907282137257805,
          27.973948803924472,
          28.04061547059114,
          28.107282137257805,
          28.17394880392447,
          28.240615470591138,
          28.307282137257804,
          28.373948803924474,
          28.44061547059114,
          28.507282137257807,
          28.573948803924473,
          28.64061547059114,
          28.707282137257806,
          28.773948803924473,
          28.84061547059114,
          28.907282137257805,
          28.973948803924472,
          29.04061547059114,
          29.107282137257805,
          29.17394880392447,
          29.240615470591138,
          29.307282137257804,
          29.373948803924474,
          29.44061547059114,
          29.507282137257807,
          29.573948803924473,
          29.64061547059114,
          29.707282137257806,
          29.773948803924473,
          29.84061547059114,
          29.907282137257805,
          29.973948803924472,
          30.04061547059114,
          30.107282137257805,
          30.17394880392447,
          30.240615470591138,
          30.307282137257804,
          30.373948803924474,
          30.44061547059114,
          30.507282137257807,
          30.573948803924473,
          30.64061547059114,
          30.707282137257806,
          30.773948803924473,
          30.84061547059114,
          30.907282137257805,
          30.973948803924472,
          31.04061547059114,
          31.107282137257805,
          31.17394880392447,
          31.240615470591138,
          31.307282137257804,
          31.373948803924474,
          31.44061547059114,
          31.507282137257807,
          31.573948803924473,
          31.64061547059114,
          31.707282137257806,
          31.773948803924473,
          31.84061547059114,
          31.907282137257805,
          31.973948803924472,
          32.040615470591135,
          32.107282137257805,
          32.173948803924475,
          32.24061547059114,
          32.3072821372578,
          32.37394880392448,
          32.44061547059114,
          32.5072821372578,
          32.57394880392447,
          32.64061547059114,
          32.707282137257806,
          32.77394880392447,
          32.84061547059114,
          32.90728213725781,
          32.97394880392447,
          33.040615470591135,
          33.107282137257805,
          33.173948803924475,
          33.24061547059114,
          33.3072821372578,
          33.37394880392448,
          33.44061547059114,
          33.5072821372578,
          33.57394880392447,
          33.64061547059114,
          33.707282137257806,
          33.77394880392447,
          33.84061547059114,
          33.90728213725781,
          33.97394880392447,
          34.040615470591135,
          34.107282137257805,
          34.173948803924475,
          34.24061547059114,
          34.3072821372578,
          34.37394880392448,
          34.44061547059114,
          34.5072821372578,
          34.57394880392447,
          34.64061547059114,
          34.707282137257806,
          34.77394880392447,
          34.84061547059114,
          34.90728213725781,
          34.97394880392447,
          35.040615470591135,
          35.107282137257805,
          35.173948803924475,
          35.24061547059114,
          35.3072821372578,
          35.37394880392447,
          35.44061547059114,
          35.5072821372578,
          35.57394880392447,
          35.64061547059114,
          35.707282137257806,
          35.77394880392447,
          35.84061547059114,
          35.90728213725781,
          35.97394880392447,
          36.040615470591135,
          36.107282137257805,
          36.173948803924475,
          36.24061547059114,
          36.3072821372578,
          36.37394880392447,
          36.44061547059114,
          36.5072821372578,
          36.57394880392447,
          36.64061547059114,
          36.707282137257806,
          36.77394880392447,
          36.84061547059114,
          36.90728213725781,
          36.97394880392447,
          37.040615470591135,
          37.107282137257805,
          37.173948803924475,
          37.24061547059114,
          37.3072821372578,
          37.37394880392447,
          37.44061547059114,
          37.5072821372578,
          37.57394880392447,
          37.64061547059114,
          37.707282137257806,
          37.77394880392447,
          37.84061547059114,
          37.90728213725781,
          37.97394880392447,
          38.040615470591135,
          38.107282137257805,
          38.173948803924475,
          38.24061547059114,
          38.3072821372578,
          38.37394880392447,
          38.44061547059114,
          38.5072821372578,
          38.57394880392447,
          38.64061547059114,
          38.707282137257806,
          38.77394880392447,
          38.84061547059114,
          38.90728213725781,
          38.97394880392447,
          39.040615470591135,
          39.107282137257805,
          39.173948803924475,
          39.24061547059114,
          39.3072821372578,
          39.37394880392447,
          39.44061547059114,
          39.5072821372578,
          39.57394880392447,
          39.64061547059114,
          39.707282137257806,
          39.77394880392447,
          39.84061547059114,
          39.90728213725781,
          39.97394880392447,
          40.040615470591135,
          40.107282137257805,
          40.173948803924475,
          40.24061547059114,
          40.3072821372578,
          40.37394880392447,
          40.44061547059114,
          40.5072821372578,
          40.57394880392447,
          40.64061547059114,
          40.707282137257806,
          40.77394880392447,
          40.84061547059113,
          40.90728213725781,
          40.97394880392447,
          41.040615470591135,
          41.10728213725781,
          41.173948803924475,
          41.24061547059114,
          41.3072821372578,
          41.37394880392448,
          41.44061547059114,
          41.5072821372578,
          41.573948803924466,
          41.64061547059114,
          41.707282137257806,
          41.77394880392447,
          41.84061547059113,
          41.90728213725781,
          41.97394880392447,
          42.040615470591135,
          42.10728213725781,
          42.173948803924475,
          42.24061547059114,
          42.3072821372578,
          42.37394880392448,
          42.44061547059114,
          42.5072821372578,
          42.573948803924466,
          42.64061547059114,
          42.707282137257806,
          42.77394880392447,
          42.84061547059113,
          42.90728213725781,
          42.97394880392447,
          43.040615470591135,
          43.10728213725781,
          43.173948803924475,
          43.24061547059114,
          43.3072821372578,
          43.37394880392448,
          43.44061547059114,
          43.5072821372578,
          43.573948803924466,
          43.64061547059114,
          43.707282137257806,
          43.77394880392447,
          43.84061547059113,
          43.90728213725781,
          43.97394880392447,
          44.040615470591135,
          44.10728213725781,
          44.173948803924475,
          44.24061547059114,
          44.3072821372578,
          44.37394880392448,
          44.44061547059114,
          44.5072821372578,
          44.573948803924466,
          44.64061547059114,
          44.707282137257806,
          44.77394880392447,
          44.84061547059113,
          44.90728213725781,
          44.97394880392447,
          45.040615470591135,
          45.10728213725781,
          45.173948803924475,
          45.24061547059114,
          45.3072821372578,
          45.37394880392448,
          45.44061547059114,
          45.5072821372578,
          45.573948803924466,
          45.64061547059114,
          45.707282137257806,
          45.77394880392447,
          45.84061547059113,
          45.90728213725781,
          45.97394880392447,
          46.040615470591135,
          46.10728213725781,
          46.173948803924475,
          46.24061547059114,
          46.3072821372578,
          46.37394880392448,
          46.44061547059114,
          46.5072821372578,
          46.573948803924466,
          46.64061547059114,
          46.707282137257806,
          46.77394880392447,
          46.84061547059113,
          46.90728213725781,
          46.97394880392447,
          47.040615470591135,
          47.10728213725781,
          47.173948803924475,
          47.24061547059114,
          47.3072821372578,
          47.37394880392448,
          47.44061547059114,
          47.5072821372578,
          47.573948803924466,
          47.64061547059114,
          47.707282137257806,
          47.77394880392447,
          47.84061547059113,
          47.90728213725781,
          47.97394880392447,
          48.040615470591135,
          48.10728213725781,
          48.173948803924475,
          48.24061547059114,
          48.3072821372578,
          48.37394880392448,
          48.44061547059114,
          48.5072821372578,
          48.573948803924466,
          48.64061547059114,
          48.707282137257806,
          48.77394880392447,
          48.84061547059113,
          48.90728213725781,
          48.97394880392447,
          49.040615470591135,
          49.10728213725781,
          49.173948803924475,
          49.24061547059114,
          49.3072821372578
        ]
      },
      "refs": [
        {
          "src": "data/long_videos/02/refs/00_{man_judge}.jpg",
          "name": "{man_judge}"
        },
        {
          "src": "data/long_videos/02/refs/01_{man_blue_robe}.jpg",
          "name": "{man_blue_robe}"
        },
        {
          "src": "data/long_videos/02/refs/02_{man_teal_robe}.jpg",
          "name": "{man_teal_robe}"
        }
      ],
      "desc": "Courtyard judgment"
    },
    {
      "seq": "03",
      "duration": 40.6,
      "video": "data/long_videos/03/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                2.012343168258667
              ],
              [
                2.012343168258667,
                3.51481032371521
              ],
              [
                3.51481032371521,
                10.025500297546387
              ],
              [
                10.025500297546387,
                11.958675384521484
              ],
              [
                11.958675384521484,
                22.54606056213379
              ],
              [
                22.54606056213379,
                24.549348831176758
              ],
              [
                24.549348831176758,
                31.560861587524414
              ],
              [
                31.560861587524414,
                33.13344192504883
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.0524089336395264,
                2.0524494647979736
              ],
              [
                3.5548758506774902,
                3.5549163818359375
              ],
              [
                10.065566062927246,
                10.065607070922852
              ],
              [
                11.568034172058105,
                11.568075180053711
              ],
              [
                22.586124420166016,
                22.586166381835938
              ],
              [
                24.589412689208984,
                24.589454650878906
              ]
            ]
          },
          {
            "name": "{woman_in_blue_dress}",
            "description": "{woman_in_blue_dress} is a young Indian woman with dark hair tied back in a ponytail. She is wearing a light blue, patterned tunic (kurta) with three-quarter sleeves and white lace detailing around the V-neck and cuffs. She has small earrings and bracelets on both wrists.",
            "time_intervals": [
              [
                0.0,
                2.012343168258667
              ],
              [
                3.51481032371521,
                11.958675384521484
              ],
              [
                11.958675384521484,
                12.45949649810791
              ],
              [
                12.45949649810791,
                19.170516967773438
              ],
              [
                19.170516967773438,
                22.54606056213379
              ],
              [
                24.549348831176758,
                29.18696403503418
              ],
              [
                29.18696403503418,
                31.560861587524414
              ]
            ]
          },
          {
            "name": "{man_in_orange_shirt}",
            "description": "{man_in_orange_shirt} is a young Indian man with short, dark, wavy hair and a light beard and mustache. He is wearing a bright orange short-sleeved polo shirt with a white-lined collar and light grey pants.",
            "time_intervals": [
              [
                0.0,
                2.012343168258667
              ],
              [
                2.012343168258667,
                3.51481032371521
              ],
              [
                3.51481032371521,
                10.025500297546387
              ],
              [
                10.025500297546387,
                11.958675384521484
              ],
              [
                11.958675384521484,
                22.54606056213379
              ],
              [
                22.54606056213379,
                24.549348831176758
              ],
              [
                24.549348831176758,
                31.560861587524414
              ]
            ]
          },
          {
            "name": "{bottle_of_alcohol}",
            "description": "{bottle_of_alcohol} is a green glass bottle with a short neck, a black cap, and a gold and white label on its front.",
            "time_intervals": [
              [
                2.012343168258667,
                3.51481032371521
              ],
              [
                10.025500297546387,
                11.958675384521484
              ],
              [
                22.54606056213379,
                24.549348831176758
              ]
            ]
          },
          {
            "name": "{scene_living_room}",
            "description": "{scene_living_room} is a modern, well-lit living room with light-colored walls, one of which has a textured grey pattern. It features a large, tufted turquoise sofa, a dark coffee table, a TV stand, and potted plants. A kitchen area with dark wood cabinets and hanging lights is visible in the background.",
            "time_intervals": [
              [
                0.0,
                40.599998474121094
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} is static, showing a medium shot of the woman from over the man's shoulder.",
            "time_intervals": [
              0.0,
              2.012343168258667
            ]
          },
          {
            "name": "{woman_in_blue_dress}",
            "description": "{woman_in_blue_dress} raises her right hand and points her finger accusingly at {man_in_orange_shirt} while continuing to speak angrily.",
            "time_intervals": [
              0.0,
              2.012343168258667
            ]
          },
          {
            "name": "{man_in_orange_shirt}",
            "description": "{man_in_orange_shirt} is partially visible from behind, being confronted by {woman_in_blue_dress}.",
            "time_intervals": [
              0.0,
              2.012343168258667
            ]
          },
          {
            "name": "{scene_living_room}",
            "description": "{scene_living_room} is the setting for the entire video.",
            "time_intervals": [
              0.0,
              40.599998474121094
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a medium shot of the man sitting on the sofa.",
            "time_intervals": [
              2.012343168258667,
              3.51481032371521
            ]
          },
          {
            "name": "{man_in_orange_shirt}",
            "description": "{man_in_orange_shirt} sits on the sofa, looking down with a sad and guilty expression, with {bottle_of_alcohol} in front of him.",
            "time_intervals": [
              2.012343168258667,
              3.51481032371521
            ]
          },
          {
            "name": "{bottle_of_alcohol}",
            "description": "{bottle_of_alcohol} is on a dark coffee table in front of {man_in_orange_shirt}.",
            "time_intervals": [
              2.012343168258667,
              3.51481032371521
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut from a woman to a man sitting on the sofa.",
            "time_intervals": [
              2.0524089336395264,
              2.0524494647979736
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts back to the over-the-shoulder shot of the woman.",
            "time_intervals": [
              3.51481032371521,
              10.025500297546387
            ]
          },
          {
            "name": "{man_in_orange_shirt}",
            "description": "{man_in_orange_shirt} is partially visible from behind as {woman_in_blue_dress} continues to speak to him.",
            "time_intervals": [
              3.51481032371521,
              10.025500297546387
            ]
          },
          {
            "name": "{woman_in_blue_dress}",
            "description": "{woman_in_blue_dress} continues to stand and argue with {man_in_orange_shirt}, her expression filled with frustration.",
            "time_intervals": [
              3.51481032371521,
              11.958675384521484
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut from the man back to the woman.",
            "time_intervals": [
              3.5548758506774902,
              3.5549163818359375
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts back to the medium shot of the man on the sofa.",
            "time_intervals": [
              10.025500297546387,
              11.958675384521484
            ]
          },
          {
            "name": "{man_in_orange_shirt}",
            "description": "{man_in_orange_shirt} looks up from the sofa towards {woman_in_blue_dress} with a stoic expression.",
            "time_intervals": [
              10.025500297546387,
              11.958675384521484
            ]
          },
          {
            "name": "{bottle_of_alcohol}",
            "description": "{bottle_of_alcohol} remains on the coffee table.",
            "time_intervals": [
              10.025500297546387,
              11.958675384521484
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut from the woman back to the man.",
            "time_intervals": [
              10.065566062927246,
              10.065607070922852
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut from the man back to the woman.",
            "time_intervals": [
              11.568034172058105,
              11.568075180053711
            ]
          },
          {
            "name": "{woman_in_blue_dress}",
            "description": "{woman_in_blue_dress} raises her right hand to her forehead, looking stressed and exasperated.",
            "time_intervals": [
              11.958675384521484,
              12.45949649810791
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts back to the over-the-shoulder shot of the woman.",
            "time_intervals": [
              11.958675384521484,
              22.54606056213379
            ]
          },
          {
            "name": "{man_in_orange_shirt}",
            "description": "{man_in_orange_shirt} is partially visible from behind, listening to the argument.",
            "time_intervals": [
              11.958675384521484,
              22.54606056213379
            ]
          },
          {
            "name": "{woman_in_blue_dress}",
            "description": "{woman_in_blue_dress} lowers her hand and continues her frustrated speech, making small gestures.",
            "time_intervals": [
              12.45949649810791,
              19.170516967773438
            ]
          },
          {
            "name": "{woman_in_blue_dress}",
            "description": "{woman_in_blue_dress} extends both her arms out to her sides while speaking, emphasizing her point with a look of disbelief.",
            "time_intervals": [
              19.170516967773438,
              22.54606056213379
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to the medium shot of the man.",
            "time_intervals": [
              22.54606056213379,
              24.549348831176758
            ]
          },
          {
            "name": "{man_in_orange_shirt}",
            "description": "{man_in_orange_shirt} sits on the sofa, looking down again with a somber expression.",
            "time_intervals": [
              22.54606056213379,
              24.549348831176758
            ]
          },
          {
            "name": "{bottle_of_alcohol}",
            "description": "{bottle_of_alcohol} is visible on the coffee table.",
            "time_intervals": [
              22.54606056213379,
              24.549348831176758
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut from the woman back to the man.",
            "time_intervals": [
              22.586124420166016,
              22.586166381835938
            ]
          },
          {
            "name": "{woman_in_blue_dress}",
            "description": "{woman_in_blue_dress} continues to speak angrily, now holding a phone in her left hand.",
            "time_intervals": [
              24.549348831176758,
              29.18696403503418
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to the over-the-shoulder shot of the woman.",
            "time_intervals": [
              24.549348831176758,
              31.560861587524414
            ]
          },
          {
            "name": "{man_in_orange_shirt}",
            "description": "{man_in_orange_shirt} is partially visible from behind.",
            "time_intervals": [
              24.549348831176758,
              31.560861587524414
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut from the man back to the woman.",
            "time_intervals": [
              24.589412689208984,
              24.589454650878906
            ]
          },
          {
            "name": "{woman_in_blue_dress}",
            "description": "{woman_in_blue_dress} points with the phone in her hand while arguing with {man_in_orange_shirt}.",
            "time_intervals": [
              29.18696403503418,
              31.560861587524414
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to the medium shot of the man.",
            "time_intervals": [
              31.560861587524414,
              33.13344192504883
            ]
          }
        ],
        "data_id": "f34392d2c1cb2c2a26785fe171dbe4d1",
        "frame_timestamps": [
          2.950961110374259,
          3.017627777040926,
          3.0842944437075923,
          3.150961110374259,
          3.2176277770409256,
          3.2842944437075925,
          3.350961110374259,
          3.417627777040926,
          3.4842944437075922,
          3.550961110374259,
          3.6176277770409255,
          3.6842944437075924,
          3.7509611103742593,
          3.8176277770409257,
          3.884294443707592,
          3.950961110374259,
          4.017627777040926,
          4.084294443707592,
          4.150961110374259,
          4.217627777040926,
          4.2842944437075925,
          4.350961110374259,
          4.417627777040925,
          4.484294443707592,
          4.550961110374259,
          4.6176277770409255,
          4.684294443707593,
          4.750961110374259,
          4.817627777040926,
          4.884294443707592,
          4.950961110374259,
          5.017627777040925,
          5.084294443707592,
          5.15096111037426,
          5.217627777040926,
          5.2842944437075925,
          5.350961110374259,
          5.417627777040925,
          5.484294443707592,
          5.550961110374259,
          5.6176277770409255,
          5.684294443707593,
          5.750961110374259,
          5.817627777040926,
          5.884294443707592,
          5.950961110374259,
          6.017627777040925,
          6.084294443707592,
          6.15096111037426,
          6.217627777040926,
          6.2842944437075925,
          6.350961110374259,
          6.417627777040925,
          6.484294443707592,
          6.550961110374259,
          6.6176277770409255,
          6.684294443707593,
          6.750961110374259,
          6.817627777040926,
          6.884294443707592,
          6.950961110374259,
          7.017627777040925,
          7.084294443707591,
          7.15096111037426,
          7.217627777040926,
          7.2842944437075925,
          7.350961110374259,
          7.417627777040925,
          7.484294443707592,
          7.550961110374258,
          7.617627777040926,
          7.684294443707593,
          7.750961110374259,
          7.817627777040926,
          7.884294443707592,
          7.950961110374259,
          8.017627777040925,
          8.084294443707591,
          8.15096111037426,
          8.217627777040926,
          8.284294443707592,
          8.350961110374259,
          8.417627777040925,
          8.484294443707592,
          8.550961110374258,
          8.617627777040926,
          8.684294443707593,
          8.75096111037426,
          8.817627777040926,
          8.884294443707592,
          8.950961110374259,
          9.017627777040925,
          9.084294443707591,
          9.15096111037426,
          9.217627777040926,
          9.284294443707592,
          9.350961110374259,
          9.417627777040925,
          9.484294443707592,
          9.550961110374258,
          9.617627777040926,
          9.684294443707593,
          9.75096111037426,
          9.817627777040926,
          9.884294443707592,
          9.950961110374259,
          10.017627777040925,
          10.084294443707591,
          10.15096111037426,
          10.217627777040926,
          10.284294443707592,
          10.350961110374259,
          10.417627777040925,
          10.484294443707592,
          10.550961110374258,
          10.617627777040926,
          10.684294443707593,
          10.75096111037426,
          10.817627777040926,
          10.884294443707592,
          10.950961110374259,
          11.017627777040925,
          11.084294443707591,
          11.150961110374258,
          11.217627777040924,
          11.284294443707592,
          11.350961110374259,
          11.417627777040925,
          11.484294443707592,
          11.550961110374258,
          11.617627777040925,
          11.684294443707591,
          11.75096111037426,
          11.817627777040926,
          11.884294443707592,
          11.950961110374259,
          12.017627777040925,
          12.084294443707591,
          12.150961110374258,
          12.217627777040924,
          12.284294443707592,
          12.350961110374259,
          12.417627777040925,
          12.484294443707592,
          12.550961110374258,
          12.617627777040925,
          12.684294443707591,
          12.75096111037426,
          12.817627777040926,
          12.884294443707592,
          12.950961110374259,
          13.017627777040925,
          13.084294443707591,
          13.150961110374258,
          13.217627777040924,
          13.284294443707592,
          13.350961110374259,
          13.417627777040925,
          13.484294443707592,
          13.550961110374258,
          13.617627777040925,
          13.684294443707591,
          13.75096111037426,
          13.817627777040926,
          13.884294443707592,
          13.950961110374259,
          14.017627777040925,
          14.084294443707591,
          14.150961110374258,
          14.217627777040924,
          14.284294443707592,
          14.350961110374259,
          14.417627777040925,
          14.484294443707592,
          14.550961110374258,
          14.617627777040925,
          14.684294443707591,
          14.75096111037426,
          14.817627777040926,
          14.884294443707592,
          14.950961110374259,
          15.017627777040925,
          15.084294443707591,
          15.150961110374258,
          15.217627777040924,
          15.284294443707592,
          15.350961110374259,
          15.417627777040925,
          15.484294443707592,
          15.550961110374258,
          15.617627777040925,
          15.684294443707591,
          15.75096111037426,
          15.817627777040926,
          15.884294443707592,
          15.950961110374259,
          16.017627777040925,
          16.08429444370759,
          16.150961110374258,
          16.217627777040924,
          16.284294443707594,
          16.35096111037426,
          16.417627777040927,
          16.484294443707594,
          16.55096111037426,
          16.617627777040926,
          16.684294443707593,
          16.75096111037426,
          16.817627777040926,
          16.884294443707592,
          16.95096111037426,
          17.017627777040925,
          17.08429444370759,
          17.150961110374258,
          17.217627777040924,
          17.284294443707594,
          17.35096111037426,
          17.417627777040927,
          17.484294443707594,
          17.55096111037426,
          17.617627777040926,
          17.684294443707593,
          17.75096111037426,
          17.817627777040926,
          17.884294443707592,
          17.95096111037426,
          18.017627777040925,
          18.08429444370759,
          18.150961110374258,
          18.217627777040924,
          18.284294443707594,
          18.35096111037426,
          18.417627777040927,
          18.484294443707594,
          18.55096111037426,
          18.617627777040926,
          18.684294443707593,
          18.75096111037426,
          18.817627777040926,
          18.884294443707592,
          18.95096111037426,
          19.017627777040925,
          19.08429444370759,
          19.150961110374258,
          19.217627777040924,
          19.28429444370759,
          19.350961110374257,
          19.417627777040924,
          19.48429444370759,
          19.55096111037426,
          19.617627777040926,
          19.684294443707593,
          19.75096111037426,
          19.817627777040926,
          19.884294443707592,
          19.95096111037426,
          20.017627777040925,
          20.08429444370759,
          20.150961110374258,
          20.217627777040924,
          20.28429444370759,
          20.350961110374257,
          20.417627777040924,
          20.48429444370759,
          20.55096111037426,
          20.617627777040926,
          20.684294443707593,
          20.75096111037426,
          20.817627777040926,
          20.884294443707592,
          20.95096111037426,
          21.017627777040925,
          21.08429444370759,
          21.150961110374258,
          21.217627777040924,
          21.28429444370759,
          21.350961110374257,
          21.417627777040924,
          21.48429444370759,
          21.55096111037426,
          21.617627777040926,
          21.684294443707593,
          21.75096111037426,
          21.817627777040926,
          21.884294443707592,
          21.95096111037426,
          22.017627777040925,
          22.08429444370759,
          22.150961110374258,
          22.217627777040924,
          22.28429444370759,
          22.350961110374257,
          22.417627777040924,
          22.48429444370759,
          22.55096111037426,
          22.617627777040926,
          22.684294443707593,
          22.75096111037426,
          22.817627777040926,
          22.884294443707592,
          22.95096111037426,
          23.017627777040925,
          23.08429444370759,
          23.150961110374258,
          23.217627777040924,
          23.28429444370759,
          23.350961110374257,
          23.417627777040924,
          23.48429444370759,
          23.55096111037426,
          23.617627777040926,
          23.684294443707593,
          23.75096111037426,
          23.817627777040926,
          23.884294443707592,
          23.95096111037426,
          24.017627777040925,
          24.08429444370759,
          24.150961110374258,
          24.217627777040924,
          24.28429444370759,
          24.350961110374257,
          24.417627777040924,
          24.48429444370759,
          24.55096111037426,
          24.617627777040926,
          24.684294443707593,
          24.75096111037426,
          24.817627777040926,
          24.884294443707592,
          24.95096111037426,
          25.017627777040925,
          25.08429444370759,
          25.150961110374258,
          25.217627777040924,
          25.28429444370759,
          25.350961110374257,
          25.417627777040924,
          25.48429444370759,
          25.55096111037426,
          25.617627777040926,
          25.684294443707593,
          25.75096111037426,
          25.817627777040926,
          25.884294443707592,
          25.95096111037426,
          26.017627777040925,
          26.08429444370759,
          26.150961110374258,
          26.217627777040924,
          26.28429444370759,
          26.350961110374257,
          26.417627777040924,
          26.48429444370759,
          26.55096111037426,
          26.617627777040926,
          26.684294443707593,
          26.75096111037426,
          26.817627777040926,
          26.884294443707592,
          26.95096111037426,
          27.017627777040925,
          27.08429444370759,
          27.150961110374258,
          27.217627777040924,
          27.28429444370759,
          27.350961110374257,
          27.417627777040924,
          27.48429444370759,
          27.55096111037426,
          27.617627777040926,
          27.684294443707593,
          27.75096111037426,
          27.817627777040926,
          27.884294443707592,
          27.95096111037426,
          28.017627777040925,
          28.08429444370759,
          28.150961110374258,
          28.217627777040924,
          28.28429444370759,
          28.350961110374257,
          28.417627777040924,
          28.48429444370759,
          28.55096111037426,
          28.617627777040926,
          28.684294443707593,
          28.75096111037426,
          28.817627777040926,
          28.884294443707592,
          28.95096111037426,
          29.017627777040925,
          29.08429444370759,
          29.150961110374258,
          29.217627777040924,
          29.28429444370759,
          29.350961110374257,
          29.417627777040924,
          29.48429444370759,
          29.550961110374256,
          29.617627777040926,
          29.684294443707593,
          29.75096111037426,
          29.817627777040926,
          29.884294443707592,
          29.95096111037426,
          30.017627777040925,
          30.08429444370759,
          30.150961110374258,
          30.217627777040924,
          30.28429444370759,
          30.350961110374257,
          30.417627777040924,
          30.48429444370759,
          30.550961110374256,
          30.617627777040926,
          30.684294443707593,
          30.75096111037426,
          30.817627777040926,
          30.884294443707592,
          30.95096111037426,
          31.017627777040925,
          31.08429444370759,
          31.150961110374258,
          31.217627777040924,
          31.28429444370759,
          31.350961110374257,
          31.417627777040924,
          31.48429444370759,
          31.550961110374256,
          31.617627777040926,
          31.684294443707593,
          31.75096111037426,
          31.817627777040926,
          31.884294443707592,
          31.95096111037426,
          32.01762777704093,
          32.08429444370759,
          32.15096111037426,
          32.217627777040924,
          32.284294443707594,
          32.35096111037426,
          32.41762777704093,
          32.48429444370759,
          32.55096111037426,
          32.61762777704093,
          32.68429444370759,
          32.75096111037426,
          32.817627777040926,
          32.884294443707596,
          32.95096111037426,
          33.01762777704093,
          33.08429444370759,
          33.15096111037426,
          33.217627777040924,
          33.284294443707594,
          33.35096111037426,
          33.41762777704093,
          33.48429444370759,
          33.55096111037426,
          33.61762777704093,
          33.68429444370759,
          33.75096111037426,
          33.817627777040926,
          33.884294443707596,
          33.95096111037426,
          34.01762777704093,
          34.08429444370759,
          34.15096111037426,
          34.217627777040924,
          34.284294443707594,
          34.35096111037426,
          34.41762777704093,
          34.48429444370759,
          34.55096111037426,
          34.61762777704093,
          34.68429444370759,
          34.75096111037426,
          34.817627777040926,
          34.884294443707596,
          34.95096111037426,
          35.01762777704092,
          35.08429444370759,
          35.15096111037426,
          35.217627777040924,
          35.284294443707594,
          35.35096111037426,
          35.41762777704093,
          35.48429444370759,
          35.55096111037426,
          35.61762777704092,
          35.68429444370759,
          35.750961110374256,
          35.817627777040926,
          35.88429444370759,
          35.95096111037426,
          36.01762777704092,
          36.08429444370759,
          36.15096111037426,
          36.217627777040924,
          36.284294443707594,
          36.35096111037426,
          36.41762777704093,
          36.48429444370759,
          36.55096111037426,
          36.61762777704092,
          36.68429444370759,
          36.750961110374256,
          36.817627777040926,
          36.88429444370759,
          36.95096111037426,
          37.01762777704092,
          37.08429444370759,
          37.15096111037426,
          37.217627777040924,
          37.284294443707594,
          37.35096111037426,
          37.41762777704093,
          37.48429444370759,
          37.55096111037426,
          37.61762777704092,
          37.68429444370759,
          37.750961110374256,
          37.817627777040926,
          37.88429444370759,
          37.95096111037426,
          38.01762777704092,
          38.08429444370759,
          38.15096111037426,
          38.217627777040924,
          38.284294443707594,
          38.35096111037426,
          38.41762777704093,
          38.48429444370759,
          38.55096111037426,
          38.61762777704092,
          38.68429444370759,
          38.750961110374256,
          38.817627777040926,
          38.88429444370759,
          38.95096111037426,
          39.01762777704092,
          39.08429444370759,
          39.15096111037426,
          39.217627777040924,
          39.284294443707594,
          39.35096111037426,
          39.41762777704093,
          39.48429444370759,
          39.55096111037426,
          39.61762777704092,
          39.68429444370759,
          39.750961110374256,
          39.817627777040926,
          39.88429444370759,
          39.95096111037426,
          40.01762777704092,
          40.08429444370759,
          40.15096111037426,
          40.217627777040924,
          40.284294443707594,
          40.35096111037426,
          40.41762777704093,
          40.48429444370759,
          40.55096111037426,
          40.61762777704092,
          40.68429444370759,
          40.750961110374256,
          40.817627777040926,
          40.88429444370759,
          40.95096111037426,
          41.01762777704092,
          41.08429444370759,
          41.15096111037426,
          41.217627777040924,
          41.284294443707594,
          41.35096111037426,
          41.41762777704093,
          41.48429444370759,
          41.55096111037426,
          41.61762777704092,
          41.68429444370759,
          41.750961110374256,
          41.817627777040926,
          41.88429444370759,
          41.95096111037426,
          42.01762777704092,
          42.08429444370759,
          42.15096111037426,
          42.217627777040924,
          42.284294443707594,
          42.35096111037426,
          42.41762777704093,
          42.48429444370759,
          42.55096111037426,
          42.61762777704092,
          42.68429444370759,
          42.750961110374256,
          42.817627777040926,
          42.88429444370759,
          42.95096111037426,
          43.01762777704092,
          43.08429444370759,
          43.15096111037426,
          43.217627777040924,
          43.284294443707594,
          43.35096111037426,
          43.41762777704093,
          43.48429444370759
        ]
      },
      "refs": [
        {
          "src": "data/long_videos/03/refs/00_{woman_in_blue_dress}.jpg",
          "name": "{woman_in_blue_dress}"
        },
        {
          "src": "data/long_videos/03/refs/01_{man_in_orange_shirt}.jpg",
          "name": "{man_in_orange_shirt}"
        },
        {
          "src": "data/long_videos/03/refs/02_{bottle_of_alcohol}.jpg",
          "name": "{bottle_of_alcohol}"
        }
      ],
      "desc": "Living room confrontation"
    },
    {
      "seq": "04",
      "duration": 40.6,
      "video": "data/long_videos/04/video.mp4",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                7.54183292388916
              ],
              [
                7.54183292388916,
                9.785517692565918
              ],
              [
                9.785517692565918,
                17.42806625366211
              ],
              [
                17.42806625366211,
                24.940401077270508
              ],
              [
                24.940401077270508,
                26.34270477294922
              ],
              [
                26.34270477294922,
                27.244184494018555
              ],
              [
                27.244184494018555,
                31.080482482910156
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                7.42163610458374,
                7.4216766357421875
              ],
              [
                9.925747871398926,
                9.925787925720215
              ],
              [
                17.438081741333008,
                17.43812370300293
              ],
              [
                24.95041847229004,
                24.95046043395996
              ],
              [
                26.452884674072266,
                26.452926635742188
              ],
              [
                27.454530715942383,
                27.454572677612305
              ]
            ]
          },
          {
            "name": "{man_younger}",
            "description": "{man_younger} is a young, fair-skinned man with short, styled blond hair. He is wearing a grey, long-sleeved crewneck shirt.",
            "time_intervals": [
              [
                0.0,
                1.1012578010559082
              ],
              [
                1.1012578010559082,
                1.7723597288131714
              ],
              [
                1.7723597288131714,
                4.807343006134033
              ],
              [
                4.807343006134033,
                6.980911731719971
              ],
              [
                6.980911731719971,
                7.54183292388916
              ],
              [
                9.785517692565918,
                10.847260475158691
              ],
              [
                10.847260475158691,
                17.42806625366211
              ],
              [
                17.42806625366211,
                21.935468673706055
              ],
              [
                21.935468673706055,
                24.13908576965332
              ],
              [
                26.34270477294922,
                27.244184494018555
              ]
            ]
          },
          {
            "name": "{man_older}",
            "description": "{man_older} is an older, fair-skinned man with thinning blondish-white hair, a short beard, and a visible scar on his left cheek. He is wearing a light brown t-shirt with a chest pocket.",
            "time_intervals": [
              [
                0.0,
                7.54183292388916
              ],
              [
                7.54183292388916,
                8.843971252441406
              ],
              [
                8.843971252441406,
                10.486668586730957
              ],
              [
                17.42806625366211,
                21.43464469909668
              ],
              [
                21.43464469909668,
                24.13908576965332
              ],
              [
                24.13908576965332,
                24.940401077270508
              ],
              [
                24.940401077270508,
                26.34270477294922
              ],
              [
                27.244184494018555,
                31.080482482910156
              ]
            ]
          },
          {
            "name": "{scene_dining_room}",
            "description": "{scene_dining_room} is a modern, warmly lit dining area. It features a dark dining table, a large glass door or window with a view of a city, a dark curtain, and a framed painting on a white wall.",
            "time_intervals": [
              [
                0.0,
                40.599998474121094
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{man_younger}",
            "description": "{man_younger} is partially obscured by {man_older}'s back while he continues eating.",
            "time_intervals": [
              0.0,
              1.1012578010559082
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a static over-the-shoulder shot from behind {man_older}, focusing on {man_younger}.",
            "time_intervals": [
              0.0,
              7.54183292388916
            ]
          },
          {
            "name": "{man_older}",
            "description": "{man_older} is seen from behind, his back obscuring part of the view of {man_younger}.",
            "time_intervals": [
              0.0,
              7.54183292388916
            ]
          },
          {
            "name": "{scene_dining_room}",
            "description": "{scene_dining_room} serves as the constant background for the entire video.",
            "time_intervals": [
              0.0,
              40.599998474121094
            ]
          },
          {
            "name": "{man_younger}",
            "description": "{man_younger} brings a spoonful of food to his mouth.",
            "time_intervals": [
              1.1012578010559082,
              1.7723597288131714
            ]
          },
          {
            "name": "{man_younger}",
            "description": "{man_younger} chews his food and looks down at his bowl.",
            "time_intervals": [
              1.7723597288131714,
              4.807343006134033
            ]
          },
          {
            "name": "{man_younger}",
            "description": "{man_younger} stops eating, holds his spoon, and looks up to the left thoughtfully.",
            "time_intervals": [
              4.807343006134033,
              6.980911731719971
            ]
          },
          {
            "name": "{man_younger}",
            "description": "{man_younger} begins to speak to {man_older}.",
            "time_intervals": [
              6.980911731719971,
              7.54183292388916
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              7.42163610458374,
              7.4216766357421875
            ]
          },
          {
            "name": "{man_older}",
            "description": "{man_older} reappears in a close-up, looking at {man_younger} with a neutral expression.",
            "time_intervals": [
              7.54183292388916,
              8.843971252441406
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a static close-up shot of {man_older}'s face.",
            "time_intervals": [
              7.54183292388916,
              9.785517692565918
            ]
          },
          {
            "name": "{man_older}",
            "description": "{man_older} begins to speak, stating he doesn't have a problem.",
            "time_intervals": [
              8.843971252441406,
              10.486668586730957
            ]
          },
          {
            "name": "{man_younger}",
            "description": "{man_younger} reappears, smiling as he listens to {man_older}'s response.",
            "time_intervals": [
              9.785517692565918,
              10.847260475158691
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a static over-the-shoulder shot from behind {man_older}, focusing on {man_younger}.",
            "time_intervals": [
              9.785517692565918,
              17.42806625366211
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              9.925747871398926,
              9.925787925720215
            ]
          },
          {
            "name": "{man_younger}",
            "description": "{man_younger} continues speaking to {man_older}, clarifying his question about {man_older}'s 'thing'.",
            "time_intervals": [
              10.847260475158691,
              17.42806625366211
            ]
          },
          {
            "name": "{man_older}",
            "description": "{man_older} appears in a two-shot, speaking to {man_younger} and revealing his passion is to get out of his wheelchair.",
            "time_intervals": [
              17.42806625366211,
              21.43464469909668
            ]
          },
          {
            "name": "{man_younger}",
            "description": "{man_younger} turns his head to face {man_older} and listens intently as {man_older} speaks.",
            "time_intervals": [
              17.42806625366211,
              21.935468673706055
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a static medium shot from the side, showing both men at the table.",
            "time_intervals": [
              17.42806625366211,
              24.940401077270508
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              17.438081741333008,
              17.43812370300293
            ]
          },
          {
            "name": "{man_older}",
            "description": "{man_older} looks down and stirs the food in his bowl with a spoon while listening to {man_younger}.",
            "time_intervals": [
              21.43464469909668,
              24.13908576965332
            ]
          },
          {
            "name": "{man_younger}",
            "description": "{man_younger} continues the conversation, asking {man_older} if he is an amateur or professional photographer.",
            "time_intervals": [
              21.935468673706055,
              24.13908576965332
            ]
          },
          {
            "name": "{man_older}",
            "description": "{man_older} looks up and begins to ask {man_younger} a question.",
            "time_intervals": [
              24.13908576965332,
              24.940401077270508
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a static close-up shot of {man_older}'s face.",
            "time_intervals": [
              24.940401077270508,
              26.34270477294922
            ]
          },
          {
            "name": "{man_older}",
            "description": "{man_older} appears in a close-up, listening and then speaking to {man_younger}.",
            "time_intervals": [
              24.940401077270508,
              26.34270477294922
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              24.95041847229004,
              24.95046043395996
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a static medium close-up shot of {man_younger}.",
            "time_intervals": [
              26.34270477294922,
              27.244184494018555
            ]
          },
          {
            "name": "{man_younger}",
            "description": "{man_younger} reappears, looking down as he speaks and says that he draws.",
            "time_intervals": [
              26.34270477294922,
              27.244184494018555
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              26.452884674072266,
              26.452926635742188
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a static close-up shot of {man_older}'s face.",
            "time_intervals": [
              27.244184494018555,
              31.080482482910156
            ]
          },
          {
            "name": "{man_older}",
            "description": "{man_older} reappears in a close-up, looking intently at {man_younger} as he speaks.",
            "time_intervals": [
              27.244184494018555,
              31.080482482910156
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              27.454530715942383,
              27.454572677612305
            ]
          }
        ],
        "data_id": "d51ebd14088a1a30ff080567bd3a49e9",
        "frame_timestamps": [
          12.09055050145007,
          12.157217168116736,
          12.223883834783402,
          12.290550501450069,
          12.357217168116737,
          12.423883834783403,
          12.49055050145007,
          12.557217168116736,
          12.623883834783403,
          12.690550501450069,
          12.757217168116735,
          12.823883834783402,
          12.89055050145007,
          12.957217168116737,
          13.023883834783403,
          13.09055050145007,
          13.157217168116736,
          13.223883834783402,
          13.290550501450069,
          13.357217168116737,
          13.423883834783403,
          13.49055050145007,
          13.557217168116736,
          13.623883834783403,
          13.690550501450069,
          13.757217168116735,
          13.823883834783402,
          13.89055050145007,
          13.957217168116737,
          14.023883834783403,
          14.09055050145007,
          14.157217168116736,
          14.223883834783402,
          14.29055050145007,
          14.357217168116737,
          14.423883834783403,
          14.49055050145007,
          14.557217168116736,
          14.623883834783403,
          14.690550501450069,
          14.757217168116735,
          14.823883834783402,
          14.890550501450068,
          14.957217168116737,
          15.023883834783403,
          15.09055050145007,
          15.157217168116736,
          15.223883834783402,
          15.29055050145007,
          15.357217168116737,
          15.423883834783403,
          15.49055050145007,
          15.557217168116736,
          15.623883834783403,
          15.690550501450069,
          15.757217168116735,
          15.823883834783402,
          15.890550501450068,
          15.957217168116737,
          16.0238838347834,
          16.090550501450068,
          16.157217168116738,
          16.2238838347834,
          16.29055050145007,
          16.357217168116737,
          16.423883834783403,
          16.49055050145007,
          16.557217168116736,
          16.623883834783403,
          16.69055050145007,
          16.757217168116735,
          16.823883834783402,
          16.89055050145007,
          16.957217168116735,
          17.023883834783405,
          17.090550501450068,
          17.157217168116738,
          17.2238838347834,
          17.29055050145007,
          17.357217168116737,
          17.423883834783403,
          17.49055050145007,
          17.557217168116736,
          17.623883834783403,
          17.69055050145007,
          17.757217168116735,
          17.823883834783402,
          17.89055050145007,
          17.957217168116735,
          18.023883834783405,
          18.090550501450068,
          18.157217168116738,
          18.2238838347834,
          18.29055050145007,
          18.357217168116737,
          18.423883834783403,
          18.49055050145007,
          18.557217168116736,
          18.623883834783403,
          18.69055050145007,
          18.757217168116735,
          18.823883834783402,
          18.89055050145007,
          18.957217168116735,
          19.023883834783405,
          19.090550501450068,
          19.157217168116738,
          19.2238838347834,
          19.29055050145007,
          19.357217168116737,
          19.423883834783403,
          19.49055050145007,
          19.557217168116736,
          19.623883834783403,
          19.69055050145007,
          19.757217168116735,
          19.823883834783402,
          19.89055050145007,
          19.957217168116735,
          20.023883834783405,
          20.090550501450068,
          20.157217168116738,
          20.2238838347834,
          20.29055050145007,
          20.357217168116733,
          20.423883834783403,
          20.49055050145007,
          20.557217168116736,
          20.623883834783403,
          20.69055050145007,
          20.757217168116735,
          20.823883834783402,
          20.890550501450072,
          20.957217168116735,
          21.023883834783405,
          21.090550501450068,
          21.157217168116738,
          21.2238838347834,
          21.29055050145007,
          21.357217168116733,
          21.423883834783403,
          21.49055050145007,
          21.557217168116736,
          21.623883834783403,
          21.69055050145007,
          21.757217168116735,
          21.823883834783402,
          21.890550501450072,
          21.957217168116735,
          22.023883834783405,
          22.090550501450068,
          22.157217168116738,
          22.2238838347834,
          22.29055050145007,
          22.357217168116733,
          22.423883834783403,
          22.49055050145007,
          22.557217168116736,
          22.623883834783403,
          22.69055050145007,
          22.757217168116735,
          22.823883834783402,
          22.890550501450072,
          22.957217168116735,
          23.023883834783405,
          23.090550501450068,
          23.157217168116738,
          23.2238838347834,
          23.29055050145007,
          23.357217168116733,
          23.423883834783403,
          23.49055050145007,
          23.557217168116736,
          23.623883834783403,
          23.69055050145007,
          23.757217168116735,
          23.823883834783402,
          23.890550501450072,
          23.957217168116735,
          24.023883834783405,
          24.090550501450068,
          24.157217168116738,
          24.2238838347834,
          24.29055050145007,
          24.357217168116733,
          24.423883834783403,
          24.49055050145007,
          24.557217168116736,
          24.623883834783403,
          24.69055050145007,
          24.757217168116735,
          24.823883834783402,
          24.890550501450072,
          24.957217168116735,
          25.023883834783405,
          25.090550501450068,
          25.157217168116738,
          25.2238838347834,
          25.29055050145007,
          25.357217168116733,
          25.423883834783403,
          25.49055050145007,
          25.557217168116736,
          25.623883834783403,
          25.69055050145007,
          25.757217168116735,
          25.823883834783402,
          25.89055050145007,
          25.957217168116735,
          26.023883834783405,
          26.090550501450068,
          26.157217168116738,
          26.2238838347834,
          26.29055050145007,
          26.357217168116733,
          26.423883834783403,
          26.49055050145007,
          26.557217168116736,
          26.623883834783403,
          26.69055050145007,
          26.757217168116735,
          26.823883834783402,
          26.89055050145007,
          26.957217168116735,
          27.023883834783405,
          27.090550501450068,
          27.157217168116738,
          27.2238838347834,
          27.29055050145007,
          27.357217168116733,
          27.423883834783403,
          27.49055050145007,
          27.557217168116736,
          27.623883834783403,
          27.69055050145007,
          27.757217168116735,
          27.823883834783402,
          27.89055050145007,
          27.957217168116735,
          28.023883834783405,
          28.090550501450068,
          28.157217168116738,
          28.2238838347834,
          28.29055050145007,
          28.357217168116733,
          28.423883834783403,
          28.490550501450066,
          28.557217168116736,
          28.6238838347834,
          28.69055050145007,
          28.75721716811674,
          28.823883834783402,
          28.890550501450072,
          28.957217168116735,
          29.023883834783405,
          29.090550501450068,
          29.157217168116738,
          29.2238838347834,
          29.29055050145007,
          29.357217168116733,
          29.423883834783403,
          29.490550501450066,
          29.557217168116736,
          29.6238838347834,
          29.69055050145007,
          29.75721716811674,
          29.823883834783402,
          29.890550501450072,
          29.957217168116735,
          30.023883834783405,
          30.090550501450068,
          30.157217168116738,
          30.2238838347834,
          30.29055050145007,
          30.357217168116733,
          30.423883834783403,
          30.490550501450066,
          30.557217168116736,
          30.6238838347834,
          30.69055050145007,
          30.75721716811674,
          30.823883834783402,
          30.890550501450072,
          30.957217168116735,
          31.023883834783405,
          31.090550501450068,
          31.157217168116738,
          31.2238838347834,
          31.29055050145007,
          31.357217168116733,
          31.423883834783403,
          31.490550501450066,
          31.557217168116736,
          31.6238838347834,
          31.69055050145007,
          31.75721716811674,
          31.823883834783402,
          31.890550501450072,
          31.957217168116735,
          32.023883834783405,
          32.09055050145007,
          32.15721716811674,
          32.2238838347834,
          32.29055050145007,
          32.35721716811673,
          32.4238838347834,
          32.490550501450066,
          32.557217168116736,
          32.6238838347834,
          32.69055050145007,
          32.75721716811674,
          32.8238838347834,
          32.89055050145007,
          32.957217168116735,
          33.023883834783405,
          33.09055050145007,
          33.15721716811674,
          33.2238838347834,
          33.29055050145007,
          33.35721716811673,
          33.4238838347834,
          33.490550501450066,
          33.557217168116736,
          33.6238838347834,
          33.69055050145007,
          33.75721716811674,
          33.8238838347834,
          33.89055050145007,
          33.957217168116735,
          34.023883834783405,
          34.09055050145007,
          34.15721716811674,
          34.2238838347834,
          34.29055050145007,
          34.35721716811673,
          34.4238838347834,
          34.490550501450066,
          34.557217168116736,
          34.6238838347834,
          34.69055050145007,
          34.75721716811674,
          34.8238838347834,
          34.89055050145007,
          34.957217168116735,
          35.023883834783405,
          35.09055050145007,
          35.15721716811674,
          35.2238838347834,
          35.29055050145007,
          35.35721716811673,
          35.4238838347834,
          35.490550501450066,
          35.557217168116736,
          35.6238838347834,
          35.69055050145007,
          35.75721716811674,
          35.8238838347834,
          35.89055050145007,
          35.957217168116735,
          36.023883834783405,
          36.09055050145007,
          36.15721716811674,
          36.2238838347834,
          36.29055050145007,
          36.35721716811673,
          36.4238838347834,
          36.490550501450066,
          36.557217168116736,
          36.6238838347834,
          36.69055050145007,
          36.75721716811674,
          36.8238838347834,
          36.89055050145007,
          36.957217168116735,
          37.023883834783405,
          37.09055050145007,
          37.15721716811674,
          37.2238838347834,
          37.29055050145007,
          37.35721716811673,
          37.4238838347834,
          37.490550501450066,
          37.557217168116736,
          37.6238838347834,
          37.69055050145007,
          37.75721716811674,
          37.8238838347834,
          37.89055050145007,
          37.957217168116735,
          38.023883834783405,
          38.09055050145007,
          38.15721716811674,
          38.2238838347834,
          38.29055050145007,
          38.35721716811673,
          38.4238838347834,
          38.490550501450066,
          38.557217168116736,
          38.6238838347834,
          38.69055050145007,
          38.75721716811674,
          38.8238838347834,
          38.89055050145007,
          38.957217168116735,
          39.023883834783405,
          39.09055050145007,
          39.15721716811674,
          39.2238838347834,
          39.29055050145007,
          39.35721716811673,
          39.4238838347834,
          39.490550501450066,
          39.557217168116736,
          39.6238838347834,
          39.69055050145007,
          39.75721716811674,
          39.8238838347834,
          39.89055050145007,
          39.957217168116735,
          40.023883834783405,
          40.09055050145007,
          40.15721716811674,
          40.2238838347834,
          40.29055050145007,
          40.35721716811673,
          40.4238838347834,
          40.490550501450066,
          40.557217168116736,
          40.6238838347834,
          40.69055050145007,
          40.75721716811674,
          40.8238838347834,
          40.89055050145007,
          40.957217168116735,
          41.023883834783405,
          41.09055050145007,
          41.15721716811674,
          41.2238838347834,
          41.29055050145007,
          41.35721716811673,
          41.4238838347834,
          41.490550501450066,
          41.557217168116736,
          41.6238838347834,
          41.69055050145007,
          41.75721716811674,
          41.8238838347834,
          41.89055050145007,
          41.957217168116735,
          42.023883834783405,
          42.09055050145007,
          42.15721716811674,
          42.2238838347834,
          42.29055050145007,
          42.35721716811673,
          42.4238838347834,
          42.490550501450066,
          42.557217168116736,
          42.6238838347834,
          42.69055050145007,
          42.75721716811674,
          42.8238838347834,
          42.89055050145007,
          42.957217168116735,
          43.023883834783405,
          43.09055050145007,
          43.15721716811674,
          43.2238838347834,
          43.29055050145007,
          43.35721716811673,
          43.4238838347834,
          43.490550501450066,
          43.557217168116736,
          43.6238838347834,
          43.69055050145007,
          43.75721716811674,
          43.8238838347834,
          43.89055050145007,
          43.957217168116735,
          44.023883834783405,
          44.09055050145007,
          44.15721716811673,
          44.2238838347834,
          44.29055050145007,
          44.35721716811673,
          44.4238838347834,
          44.490550501450066,
          44.557217168116736,
          44.6238838347834,
          44.69055050145007,
          44.75721716811673,
          44.8238838347834,
          44.890550501450065,
          44.957217168116735,
          45.0238838347834,
          45.09055050145007,
          45.15721716811673,
          45.2238838347834,
          45.29055050145007,
          45.35721716811673,
          45.4238838347834,
          45.490550501450066,
          45.557217168116736,
          45.6238838347834,
          45.69055050145007,
          45.75721716811673,
          45.8238838347834,
          45.890550501450065,
          45.957217168116735,
          46.0238838347834,
          46.09055050145007,
          46.15721716811673,
          46.2238838347834,
          46.29055050145007,
          46.35721716811673,
          46.4238838347834,
          46.490550501450066,
          46.557217168116736,
          46.6238838347834,
          46.69055050145007,
          46.75721716811673,
          46.8238838347834,
          46.890550501450065,
          46.957217168116735,
          47.0238838347834,
          47.09055050145007,
          47.15721716811673,
          47.2238838347834,
          47.29055050145007,
          47.35721716811673,
          47.4238838347834,
          47.490550501450066,
          47.557217168116736,
          47.6238838347834,
          47.69055050145007,
          47.75721716811673,
          47.8238838347834,
          47.890550501450065,
          47.957217168116735,
          48.0238838347834,
          48.09055050145007,
          48.15721716811673,
          48.2238838347834,
          48.29055050145007,
          48.35721716811673,
          48.4238838347834,
          48.490550501450066,
          48.557217168116736,
          48.6238838347834,
          48.69055050145007,
          48.75721716811673,
          48.8238838347834,
          48.890550501450065,
          48.957217168116735,
          49.0238838347834,
          49.09055050145007,
          49.15721716811673,
          49.2238838347834,
          49.29055050145007,
          49.35721716811673,
          49.4238838347834,
          49.490550501450066,
          49.557217168116736,
          49.6238838347834,
          49.69055050145007,
          49.75721716811673,
          49.8238838347834,
          49.890550501450065,
          49.957217168116735,
          50.0238838347834,
          50.09055050145007,
          50.15721716811673,
          50.2238838347834,
          50.29055050145007,
          50.35721716811673,
          50.4238838347834,
          50.490550501450066,
          50.557217168116736,
          50.6238838347834,
          50.69055050145007,
          50.75721716811673,
          50.8238838347834,
          50.890550501450065,
          50.957217168116735,
          51.0238838347834,
          51.09055050145007,
          51.15721716811673,
          51.2238838347834,
          51.29055050145007,
          51.35721716811673,
          51.4238838347834,
          51.490550501450066,
          51.557217168116736,
          51.6238838347834,
          51.69055050145007,
          51.75721716811673,
          51.8238838347834,
          51.890550501450065,
          51.957217168116735,
          52.0238838347834,
          52.09055050145007,
          52.15721716811673,
          52.2238838347834,
          52.29055050145007,
          52.35721716811673,
          52.4238838347834,
          52.490550501450066,
          52.557217168116736,
          52.6238838347834
        ]
      },
      "refs": [
        {
          "src": "data/long_videos/04/refs/00_{man_younger}.jpg",
          "name": "{man_younger}"
        },
        {
          "src": "data/long_videos/04/refs/01_{man_older}.jpg",
          "name": "{man_older}"
        }
      ],
      "desc": "Dining room conversation"
    }
  ],
  "comparisons": [
    {
      "seq": "01",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.918,
                3.91801
              ],
              [
                7.018,
                7.018009999999999
              ]
            ]
          },
          {
            "name": "{italian_renaissance_inventor}",
            "description": "{italian_renaissance_inventor} is an Italian Renaissance inventor in his fifties with long flowing white hair, a long wavy white beard, intense piercing dark eyes, and a high forehead. He wears a long red Renaissance-style robe (saio) over a darker tunic, a leather belt with measuring tools, and dark leather shoes.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{flying_machine_sketch}",
            "description": "{flying_machine_sketch} is a large brown parchment-paper sketch of a flying machine - intricate ink drawings of wings, gears, and an airframe, pinned to a wooden board.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{wooden_flying_model}",
            "description": "{wooden_flying_model} is a small wooden model of a flying machine on a workbench - linen-covered wings, intricate gears, leather harness, sitting on a stand.",
            "time_intervals": [
              [
                0.0,
                3.918
              ],
              [
                7.018,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_renaissance_workshop}",
            "description": "{scene_renaissance_workshop} is a Renaissance Italian workshop - exposed wooden beams, scattered drafting tables with sketches, Renaissance machinery models, a bronze armillary sphere, hanging mechanical instruments, jars of pigment, soft afternoon light through arched windows, and the smell of ink and wood.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide of {italian_renaissance_inventor} at the workbench.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{italian_renaissance_inventor}",
            "description": "{italian_renaissance_inventor} bends over the parchment, finger tracing.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{wooden_flying_model}",
            "description": "{wooden_flying_model} sits on its stand in the background.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{flying_machine_sketch}",
            "description": "{flying_machine_sketch} grows clearer with new ink.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_renaissance_workshop}",
            "description": "{scene_renaissance_workshop} surrounds with arched window light throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the sketching.",
            "time_intervals": [
              3.918,
              3.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a top-down close-up of him sketching with the quill.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{italian_renaissance_inventor}",
            "description": "{italian_renaissance_inventor}'s quill scratches new lines onto the sketch.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the model.",
            "time_intervals": [
              7.018,
              7.018009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a medium of him picking up {wooden_flying_model} and turning it.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{italian_renaissance_inventor}",
            "description": "{italian_renaissance_inventor} picks up the model and turns it, eyes shining.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{wooden_flying_model}",
            "description": "{wooden_flying_model} is picked up and turned, held up to the light.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          }
        ],
        "summary": "Inside a Renaissance Italian workshop with exposed wooden beams, scattered drafting tables with sketches, Renaissance machinery models, a bronze armillary sphere, hanging mechanical instruments, jars of pigment, soft afternoon light through arched windows, and the smell of ink and wood, an Italian Renaissance inventor in his fifties with long flowing white hair, long wavy white beard, intense piercing dark eyes, high forehead, long red Renaissance saio robe over a darker tunic, leather measuring-tools belt, and dark leather shoes works at a large brown parchment sketch of a flying machine pinned to a wooden board with a quill pen and inkpot beside. A small wooden model of a flying machine with linen-covered wings, intricate gears, and leather harness sits on a stand. The camera opens on a wide. A hard cut at four seconds tightens to a top-down close-up of him sketching. A final hard cut at seven seconds tightens to a medium as he picks up the model and turns it, eyes shining."
      },
      "refs": [
        {
          "src": "data/comparisons/01/refs/00_italian_renaissance_inventor.jpg",
          "name": "{italian_renaissance_inventor}"
        },
        {
          "src": "data/comparisons/01/refs/01_flying_machine_sketch.jpg",
          "name": "{flying_machine_sketch}"
        },
        {
          "src": "data/comparisons/01/refs/02_wooden_flying_model.jpg",
          "name": "{wooden_flying_model}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/01/videos/CineOrchestra.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/01/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/01/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/01/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/01/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/01/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Renaissance invention"
    },
    {
      "seq": "02",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.918,
                3.91801
              ],
              [
                7.018,
                7.018009999999999
              ]
            ]
          },
          {
            "name": "{victorian_lady_emma}",
            "description": "{victorian_lady_emma} is a Victorian lady in her late twenties with auburn hair piled in a chignon, pale skin with pink cheeks, blue eyes, and a soft smile. She wears a high-necked cream lace blouse, a long bustled deep emerald skirt, an emerald cameo brooch, and a string of pearls.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{victorian_lord_henry}",
            "description": "{victorian_lord_henry} is her suitor, a Victorian lord in his early thirties with dark hair, neat sideburns, a mustache, and dark eyes. He wears a black frock coat, white shirt with high collar, gray waistcoat, dark cravat, and dark trousers.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{rose_garden_path}",
            "description": "{rose_garden_path} is a winding gravel path through a Victorian English rose garden, bordered by red and pink rose hedges in full bloom.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{stone_gazebo}",
            "description": "{stone_gazebo} is a small white stone Victorian gazebo at the end of the path with climbing vines.",
            "time_intervals": [
              [
                0.0,
                7.018
              ]
            ]
          },
          {
            "name": "{scene_victorian_garden}",
            "description": "{scene_victorian_garden} is a Victorian English country estate garden in late afternoon - manicured lawns, neat rose hedges, gravel paths, a small fountain with cherub statue, distant manor house silhouette, and golden afternoon light.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide of the rose garden path.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{victorian_lady_emma}",
            "description": "{victorian_lady_emma} walks down the path holding her parasol.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{victorian_lord_henry}",
            "description": "{victorian_lord_henry} hurries to catch up.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{stone_gazebo}",
            "description": "{stone_gazebo} sits at the path's end throughout.",
            "time_intervals": [
              0.0,
              7.018
            ]
          },
          {
            "name": "{rose_garden_path}",
            "description": "{rose_garden_path} winds with rose hedges throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_victorian_garden}",
            "description": "{scene_victorian_garden} bathes in golden light throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the two-shot.",
            "time_intervals": [
              3.918,
              3.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a medium two-shot of {victorian_lady_emma} and {victorian_lord_henry} walking arm-in-arm.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{victorian_lady_emma}",
            "description": "{victorian_lady_emma} walks arm-in-arm with the lord, smiling shyly.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{victorian_lord_henry}",
            "description": "{victorian_lord_henry} walks beside her, gesturing at the roses.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the hands.",
            "time_intervals": [
              7.018,
              7.018009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up of his hand holding hers gently as they pause.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{victorian_lady_emma}",
            "description": "{victorian_lady_emma} blushes as he holds her hand gently.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{victorian_lord_henry}",
            "description": "{victorian_lord_henry}'s hand takes hers gently in close-up.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          }
        ],
        "summary": "On a Victorian English country estate garden in late afternoon with manicured lawns, neat rose hedges, gravel paths, a small fountain with cherub statue, distant manor house silhouette, golden afternoon light, a winding gravel path bordered by red and pink rose hedges, and a small white stone gazebo at the end with climbing vines, a Victorian lady in her late twenties with auburn hair piled in a chignon, pale skin with pink cheeks, blue eyes, soft smile, high-necked cream lace blouse, long bustled deep emerald skirt, emerald cameo brooch, and pearls walks holding a parasol. Her suitor in his early thirties \u2014 dark hair, sideburns, mustache, black frock coat, white shirt with high collar, gray waistcoat, dark cravat, and dark trousers \u2014 joins her. The camera opens on a wide. A hard cut at four seconds tightens to a medium two-shot as they walk arm-in-arm and he gestures at the roses. A final hard cut at seven seconds tightens to a close-up of his hand taking hers gently as she blushes."
      },
      "refs": [
        {
          "src": "data/comparisons/02/refs/00_victorian_lady_emma.jpg",
          "name": "{victorian_lady_emma}"
        },
        {
          "src": "data/comparisons/02/refs/01_victorian_lord_henry.jpg",
          "name": "{victorian_lord_henry}"
        },
        {
          "src": "data/comparisons/02/refs/02_rose_garden_path.jpg",
          "name": "{rose_garden_path}"
        },
        {
          "src": "data/comparisons/02/refs/03_stone_gazebo.jpg",
          "name": "{stone_gazebo}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/02/videos/CineOrchestra.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/02/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/02/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/02/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/02/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/02/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Victorian garden stroll"
    },
    {
      "seq": "03",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.918,
                3.91801
              ],
              [
                7.018,
                7.018009999999999
              ]
            ]
          },
          {
            "name": "{geisha_yumi}",
            "description": "{geisha_yumi} is a young Japanese geisha in her early twenties with elaborate piled black hair pinned with red and gold ornamental hairpins, a chalk-white painted face, fine red lips, kohl eyes. She wears an elaborate red-and-gold silk kimono with a pattern of cranes, a wide gold obi tied at the back, white tabi socks, and red lacquered geta.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{tea_master_old}",
            "description": "{tea_master_old} is an elderly Japanese tea master in his seventies in a deep gray kimono, with neat silver hair tied back, soft kind features, and weathered hands.",
            "time_intervals": [
              [
                0.0,
                3.918
              ],
              [
                7.018,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{tea_ceremony_set}",
            "description": "{tea_ceremony_set} is the tea ceremony set on the tatami - a small black iron kettle, hand-thrown matcha bowl, bamboo whisk, bamboo scoop, and a small ceramic water jar.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{shoji_screens}",
            "description": "{shoji_screens} is sliding shoji paper screens in the background letting in soft natural light.",
            "time_intervals": [
              [
                0.0,
                3.918
              ],
              [
                7.018,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_kyoto_teahouse}",
            "description": "{scene_kyoto_teahouse} is the interior of a Kyoto traditional teahouse - tatami mats, dark wooden beams, sliding shoji screens, a small alcove (tokonoma) with a calligraphy scroll and ikebana, the ceremony set in the center, and soft afternoon light.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide of {geisha_yumi} kneeling at the tea set with {tea_master_old}.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{geisha_yumi}",
            "description": "{geisha_yumi} kneels graceful, kimono arranged perfectly.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{tea_master_old}",
            "description": "{tea_master_old} watches with a quiet smile.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{shoji_screens}",
            "description": "{shoji_screens} let in soft light throughout.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{tea_ceremony_set}",
            "description": "{tea_ceremony_set} is arranged precisely throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_kyoto_teahouse}",
            "description": "{scene_kyoto_teahouse} surrounds with tatami warmth throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the whisk.",
            "time_intervals": [
              3.918,
              3.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a top-down close-up of her hands handling the bamboo whisk.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{geisha_yumi}",
            "description": "{geisha_yumi}'s hands whisk the matcha into a bright green foam.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the bow.",
            "time_intervals": [
              7.018,
              7.018009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a profile of her presenting the bowl with both hands and a deep bow.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{geisha_yumi}",
            "description": "{geisha_yumi} presents the bowl with both hands and bows deeply.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{tea_master_old}",
            "description": "{tea_master_old} watches with a quiet smile.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{shoji_screens}",
            "description": "{shoji_screens} let in soft light throughout.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          }
        ],
        "summary": "Inside a Kyoto traditional teahouse with tatami mats, dark wooden beams, sliding shoji screens, a small alcove (tokonoma) with a calligraphy scroll and ikebana, soft afternoon light, and a tea ceremony set on the tatami - small black iron kettle, hand-thrown matcha bowl, bamboo whisk, bamboo scoop, ceramic water jar - a young Japanese geisha in her early twenties with elaborate piled black hair pinned with red and gold ornamental hairpins, chalk-white painted face, fine red lips, kohl eyes, elaborate red-and-gold silk kimono with crane pattern, wide gold obi, white tabi socks, and red lacquered geta kneels with an elderly Japanese tea master in his seventies in a deep gray kimono. The camera opens on a wide. A hard cut at four seconds tightens to a top-down close-up of her hands whisking matcha into a bright green foam. A final hard cut at seven seconds tightens to her profile presenting the bowl with both hands and a deep bow."
      },
      "refs": [
        {
          "src": "data/comparisons/03/refs/00_geisha_yumi.jpg",
          "name": "{geisha_yumi}"
        },
        {
          "src": "data/comparisons/03/refs/01_tea_master_old.jpg",
          "name": "{tea_master_old}"
        },
        {
          "src": "data/comparisons/03/refs/02_tea_ceremony_set.jpg",
          "name": "{tea_ceremony_set}"
        },
        {
          "src": "data/comparisons/03/refs/03_shoji_screens.jpg",
          "name": "{shoji_screens}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/03/videos/CineOrchestra.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/03/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/03/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/03/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/03/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/03/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Kyoto tea ceremony"
    },
    {
      "seq": "04",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                1.207
              ],
              [
                1.207,
                4.418
              ],
              [
                4.92,
                6.518
              ],
              [
                6.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                1.207
              ],
              [
                4.418,
                4.92
              ]
            ]
          },
          {
            "name": "{diver_paloma}",
            "description": "{diver_paloma} is a Spanish woman in her thirties with a black diving wetsuit zipped to the chin, a yellow-and-black BCD vest, a clear silicone mask framing dark brown eyes, a snorkel clipped to the strap, dark hair just visible at her temples, fins, and a yellow tank harnessed at her back.",
            "time_intervals": [
              [
                1.207,
                4.418
              ],
              [
                4.92,
                6.518
              ],
              [
                6.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{sea_turtle}",
            "description": "{sea_turtle} is a large green sea turtle with a moss-mottled olive shell, leathery flippers, and an old crescent scar on its plastron.",
            "time_intervals": [
              [
                2.018,
                4.92
              ],
              [
                4.92,
                6.518
              ]
            ]
          },
          {
            "name": "{sunken_anchor}",
            "description": "{sunken_anchor} is a centuries-old encrusted iron ship's anchor, its arms thickly coated in barnacles and pink coral, a frayed remnant of chain still attached at the shank.",
            "time_intervals": [
              [
                5.918,
                6.518
              ],
              [
                6.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_coral_reef}",
            "description": "{scene_coral_reef} is a tropical coral reef with brilliant turquoise water, dappled shafts of sunlight angling down from the surface, mounds of brain coral, fan corals waving in the current, schools of small silver fish darting in and out, and a dusky cobalt deep beyond the drop-off.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} fades in from black to a wide overhead view of the reef, sunlight rippling across the coral.",
            "time_intervals": [
              0.0,
              1.207
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a slow fade-in from black through the rippling water surface.",
            "time_intervals": [
              0.0,
              1.207
            ]
          },
          {
            "name": "{scene_coral_reef}",
            "description": "{scene_coral_reef} surrounds the dive with shafts of sunlight, fan corals, and silver fish throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} swims slowly behind {diver_paloma} in a steady follow shot through the coral garden.",
            "time_intervals": [
              1.207,
              4.418
            ]
          },
          {
            "name": "{diver_paloma}",
            "description": "{diver_paloma} kicks slowly through the reef, bubbles rising from her regulator.",
            "time_intervals": [
              1.207,
              4.418
            ]
          },
          {
            "name": "{sea_turtle}",
            "description": "{sea_turtle} appears from behind a coral pillar, gliding lazily upward.",
            "time_intervals": [
              2.018,
              4.92
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a fast underwater whip pan with motion blur to {sea_turtle}.",
            "time_intervals": [
              4.418,
              4.92
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} performs a half-second motion-blur whip pan that sweeps to follow {sea_turtle} as it glides past.",
            "time_intervals": [
              4.92,
              6.518
            ]
          },
          {
            "name": "{diver_paloma}",
            "description": "{diver_paloma} pauses with one hand outstretched, watching {sea_turtle} pass.",
            "time_intervals": [
              4.92,
              6.518
            ]
          },
          {
            "name": "{sea_turtle}",
            "description": "{sea_turtle} drifts past {diver_paloma} with slow flipper strokes, eye fixed on her.",
            "time_intervals": [
              4.92,
              6.518
            ]
          },
          {
            "name": "{sunken_anchor}",
            "description": "{sunken_anchor} is half-buried in pale sand, its shape barely visible through the encrusted growth.",
            "time_intervals": [
              5.918,
              6.518
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to {diver_paloma}'s POV looking down at the {sunken_anchor} half-buried in sand.",
            "time_intervals": [
              6.518,
              10.199999809265137
            ]
          },
          {
            "name": "{diver_paloma}",
            "description": "{diver_paloma}'s gloved hand reaches into the bottom of the frame to brush sand from {sunken_anchor}.",
            "time_intervals": [
              6.518,
              10.199999809265137
            ]
          },
          {
            "name": "{sunken_anchor}",
            "description": "{sunken_anchor} fills the foreground as sand swirls away from its arms.",
            "time_intervals": [
              6.518,
              10.199999809265137
            ]
          }
        ],
        "summary": "Beneath the surface of a tropical coral reef with brilliant turquoise water, dappled shafts of sunlight angling down, mounds of brain coral, fan corals waving in the current, schools of darting silver fish, and a dusky cobalt deep beyond the drop-off, the camera fades in from black over a second and a quarter to a wide overhead view of the reef, then swims slowly behind a Spanish woman in her thirties in a black wetsuit zipped to the chin, a yellow-and-black BCD vest, a clear silicone mask, fins, and a yellow tank as she kicks gently through the coral garden with bubbles trailing from her regulator. After about four and a half seconds a half-second motion-blur underwater whip pan sweeps to follow a large green sea turtle with a moss-mottled olive shell, leathery flippers, and an old crescent scar drifting past her with slow strokes as she pauses, outstretched hand gentle. A hard cut at six and a half seconds moves to her POV looking down as her gloved hand reaches in to brush sand away from a centuries-old iron ship's anchor encrusted with barnacles and pink coral, a frayed remnant of chain still attached at the shank."
      },
      "refs": [
        {
          "src": "data/comparisons/04/refs/00_{diver_paloma}.jpg",
          "name": "{diver_paloma}"
        },
        {
          "src": "data/comparisons/04/refs/01_{sea_turtle}.jpg",
          "name": "{sea_turtle}"
        },
        {
          "src": "data/comparisons/04/refs/02_{sunken_anchor}.jpg",
          "name": "{sunken_anchor}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/04/videos/Ours.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/04/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/04/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/04/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/04/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/04/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Coral reef dive"
    },
    {
      "seq": "05",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                3.6286745071411133
              ],
              [
                3.6286745071411133,
                7.212095737457275
              ],
              [
                7.212095737457275,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.880319595336914,
                3.8803298473358154
              ],
              [
                7.403345584869385,
                7.403356075286865
              ]
            ]
          },
          {
            "name": "{chef}",
            "description": "{chef} is a middle-aged, fair-skinned man with short, dark brown hair. He is wearing a black chef's jacket with orange piping, orange buttons, and an embroidered logo for 'eduK' on the left chest.",
            "time_intervals": [
              [
                0.0,
                3.6286745071411133
              ],
              [
                3.6286745071411133,
                7.212095737457275
              ]
            ]
          },
          {
            "name": "{scene_kitchen_studio}",
            "description": "{scene_kitchen_studio} is a modern kitchen setting with a white tiled backsplash, wooden shelves holding white bowls and decorative items, and a grey countertop. Decorations include hanging garlic braids, metallic vases with dried wheat, and a vintage scale.",
            "time_intervals": [
              [
                0.0,
                3.6286745071411133
              ]
            ]
          },
          {
            "name": "{woman_dark_hair}",
            "description": "{woman_dark_hair} is a woman with long, dark brown hair, wearing large gold hoop earrings, a red top, and a dark blue blazer. A small microphone is clipped to her top.",
            "time_intervals": [
              [
                3.6286745071411133,
                7.212095737457275
              ],
              [
                7.212095737457275,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{man_older_glasses}",
            "description": "{man_older_glasses} is an older, bald man with a fringe of grey hair, wearing glasses and a grey long-sleeved collared shirt.",
            "time_intervals": [
              [
                3.6286745071411133,
                7.212095737457275
              ]
            ]
          },
          {
            "name": "{woman_older_glasses}",
            "description": "{woman_older_glasses} is an older woman with short, dark hair, wearing glasses, a black patterned scarf, and a black jacket.",
            "time_intervals": [
              [
                3.6286745071411133,
                7.212095737457275
              ]
            ]
          },
          {
            "name": "{scene_kitchen_dining}",
            "description": "{scene_kitchen_dining} is a wide view of a kitchen studio featuring a long wooden dining table in the foreground where three people are seated. In the background, there's a kitchen counter with a large spread of various breads. The walls are a mix of white tile and dark wood paneling.",
            "time_intervals": [
              [
                3.6286745071411133,
                7.212095737457275
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} remains relatively static in a medium shot of {chef}.",
            "time_intervals": [
              0.0,
              3.6286745071411133
            ]
          },
          {
            "name": "{chef}",
            "description": "{chef} brings his arm back and continues speaking, gesturing with both hands, then holding up his right index finger before turning his head to the side.",
            "time_intervals": [
              0.0,
              3.6286745071411133
            ]
          },
          {
            "name": "{scene_kitchen_studio}",
            "description": "{scene_kitchen_studio} provides the background for the chef's presentation.",
            "time_intervals": [
              0.0,
              3.6286745071411133
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} provides a wide, static shot of {scene_kitchen_dining}.",
            "time_intervals": [
              3.6286745071411133,
              7.212095737457275
            ]
          },
          {
            "name": "{chef}",
            "description": "{chef} is seen in a wide shot in {scene_kitchen_dining}, standing behind a counter laden with bread, looking towards the people at the table.",
            "time_intervals": [
              3.6286745071411133,
              7.212095737457275
            ]
          },
          {
            "name": "{woman_dark_hair}",
            "description": "{woman_dark_hair} sits at the dining table in {scene_kitchen_dining}, looking at {chef}.",
            "time_intervals": [
              3.6286745071411133,
              7.212095737457275
            ]
          },
          {
            "name": "{man_older_glasses}",
            "description": "{man_older_glasses} sits at the dining table in {scene_kitchen_dining} between {woman_dark_hair} and {woman_older_glasses}, looking towards {chef}.",
            "time_intervals": [
              3.6286745071411133,
              7.212095737457275
            ]
          },
          {
            "name": "{woman_older_glasses}",
            "description": "{woman_older_glasses} sits at the end of the dining table in {scene_kitchen_dining}, looking towards {chef} with her hands on the table.",
            "time_intervals": [
              3.6286745071411133,
              7.212095737457275
            ]
          },
          {
            "name": "{scene_kitchen_dining}",
            "description": "{scene_kitchen_dining} is shown in a wide shot, with {chef} behind a counter of bread and three people, {woman_dark_hair}, {man_older_glasses}, and {woman_older_glasses}, seated at a long table.",
            "time_intervals": [
              3.6286745071411133,
              7.212095737457275
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to a wide shot of the chef and an audience.",
            "time_intervals": [
              3.880319595336914,
              3.8803298473358154
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} is in a static, close-up shot of {woman_dark_hair}.",
            "time_intervals": [
              7.212095737457275,
              10.199999809265137
            ]
          },
          {
            "name": "{woman_dark_hair}",
            "description": "{woman_dark_hair} is shown in a close-up shot, talking and gesturing with her hands.",
            "time_intervals": [
              7.212095737457275,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to a close-up of a woman in the audience.",
            "time_intervals": [
              7.403345584869385,
              7.403356075286865
            ]
          }
        ],
        "data_id": "9d5bf8fdd93aa791451537d9a29b6df6",
        "frame_timestamps": [
          48.64504215555502,
          48.71170882222169,
          48.77837548888835,
          48.84504215555502,
          48.911708822221684,
          48.978375488888354,
          49.04504215555502,
          49.111708822221686,
          49.17837548888835,
          49.24504215555502,
          49.31170882222168,
          49.37837548888835,
          49.445042155555015,
          49.511708822221685,
          49.57837548888835,
          49.64504215555502,
          49.71170882222169,
          49.77837548888835,
          49.84504215555502,
          49.911708822221684,
          49.978375488888354,
          50.04504215555502,
          50.111708822221686,
          50.17837548888835,
          50.24504215555502,
          50.31170882222168,
          50.37837548888835,
          50.445042155555015,
          50.511708822221685,
          50.57837548888835,
          50.64504215555502,
          50.71170882222168,
          50.77837548888835,
          50.84504215555502,
          50.911708822221684,
          50.978375488888354,
          51.04504215555502,
          51.111708822221686,
          51.17837548888835,
          51.24504215555502,
          51.31170882222168,
          51.37837548888835,
          51.445042155555015,
          51.511708822221685,
          51.57837548888835,
          51.64504215555502,
          51.71170882222168,
          51.77837548888835,
          51.84504215555502,
          51.911708822221684,
          51.978375488888354,
          52.04504215555502,
          52.111708822221686,
          52.17837548888835,
          52.24504215555502,
          52.31170882222168,
          52.37837548888835,
          52.445042155555015,
          52.511708822221685,
          52.57837548888835,
          52.64504215555502,
          52.71170882222168,
          52.77837548888835,
          52.84504215555502,
          52.911708822221684,
          52.978375488888354,
          53.04504215555502,
          53.111708822221686,
          53.17837548888835,
          53.24504215555502,
          53.31170882222168,
          53.37837548888835,
          53.445042155555015,
          53.511708822221685,
          53.578375488888355,
          53.64504215555502,
          53.71170882222168,
          53.77837548888835,
          53.84504215555502,
          53.911708822221684,
          53.978375488888354,
          54.04504215555502,
          54.111708822221686,
          54.17837548888835,
          54.24504215555502,
          54.31170882222168,
          54.37837548888835,
          54.445042155555015,
          54.511708822221685,
          54.578375488888355,
          54.64504215555502,
          54.71170882222168,
          54.77837548888835,
          54.84504215555502,
          54.911708822221684,
          54.978375488888354,
          55.04504215555502,
          55.111708822221686,
          55.17837548888835,
          55.24504215555502,
          55.31170882222168,
          55.37837548888835,
          55.445042155555015,
          55.511708822221685,
          55.578375488888355,
          55.64504215555502,
          55.71170882222168,
          55.77837548888835,
          55.84504215555502,
          55.911708822221684,
          55.978375488888354,
          56.04504215555502,
          56.111708822221686,
          56.17837548888835,
          56.24504215555502,
          56.31170882222168,
          56.37837548888835,
          56.445042155555015,
          56.511708822221685,
          56.578375488888355,
          56.64504215555502,
          56.71170882222168,
          56.77837548888835,
          56.84504215555502,
          56.911708822221684,
          56.978375488888354,
          57.04504215555502,
          57.111708822221686,
          57.17837548888835,
          57.24504215555502,
          57.31170882222168,
          57.37837548888835,
          57.445042155555015,
          57.511708822221685,
          57.578375488888355,
          57.64504215555502,
          57.71170882222168,
          57.77837548888835,
          57.84504215555502,
          57.911708822221684,
          57.978375488888354,
          58.04504215555502,
          58.111708822221686,
          58.17837548888835,
          58.24504215555502,
          58.31170882222168,
          58.37837548888835,
          58.445042155555015,
          58.511708822221685,
          58.578375488888355,
          58.64504215555502,
          58.71170882222168,
          58.77837548888835
        ]
      },
      "refs": [
        {
          "src": "data/comparisons/05/refs/00_{chef}.jpg",
          "name": "{chef}"
        },
        {
          "src": "data/comparisons/05/refs/01_{woman_dark_hair}.jpg",
          "name": "{woman_dark_hair}"
        },
        {
          "src": "data/comparisons/05/refs/02_{man_older_glasses}.jpg",
          "name": "{man_older_glasses}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/05/videos/Ours_720p.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/05/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/05/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/05/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/05/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/05/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Cooking show taping"
    },
    {
      "seq": "06",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.945920705795288,
                2.9459311962127686
              ],
              [
                7.475525856018066,
                7.475536346435547
              ]
            ]
          },
          {
            "name": "{woman_in_white_dress}",
            "description": "{woman_in_white_dress} is a young Asian woman with fair skin, short, wavy light-brown hair with bangs. She is wearing a sleeveless, v-neck white dress with large buttons down the front and a matching white belt. She accessorizes with a silver necklace with a small pendant and a white-strapped watch on her left wrist.",
            "time_intervals": [
              [
                0.0,
                3.026447057723999
              ],
              [
                7.506,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{woman_in_green_dress}",
            "description": "{woman_in_green_dress} is a slender Asian woman with fair skin and long, straight, dark brown hair parted on the side. She wears a sleeveless, chartreuse-green wrap dress over a black turtleneck top, cinched at the waist with a brown and black patterned belt. She has on dark earrings and is carrying a black handbag and a large paper shopping bag.",
            "time_intervals": [
              [
                3.026447057723999,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_lobby}",
            "description": "{scene_lobby} is a modern, spacious, open-air lobby featuring a high ceiling with large, glowing rectangular light fixtures and a glossy black tiled floor. It is furnished with contemporary wicker-style sofas with white cushions and patterned throw pillows. The area is decorated with large potted plants and abstract wall art, and it opens up to an outdoor area with lush green foliage.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} cuts back to the medium close-up of {woman_in_white_dress}.",
            "time_intervals": [
              0.0,
              3.026447057723999
            ]
          },
          {
            "name": "{woman_in_white_dress}",
            "description": "{woman_in_white_dress} responds to {woman_in_green_dress}, her mouth slightly open as she speaks.",
            "time_intervals": [
              0.0,
              3.026447057723999
            ]
          },
          {
            "name": "{scene_lobby}",
            "description": "{scene_lobby} is the setting where {woman_in_white_dress} waits for and then confronts {woman_in_green_dress}.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              2.945920705795288,
              2.9459311962127686
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts back to the medium close-up of {woman_in_green_dress}.",
            "time_intervals": [
              3.026447057723999,
              7.505722999572754
            ]
          },
          {
            "name": "{woman_in_green_dress}",
            "description": "{woman_in_green_dress} responds with a serious, accusatory tone, then turns her head slightly away before looking back.",
            "time_intervals": [
              3.026447057723999,
              7.505722999572754
            ]
          },
          {
            "name": "{woman_in_white_dress}",
            "description": "{woman_in_white_dress} is visible as {woman_in_green_dress} walks towards her in the wide shot.",
            "time_intervals": [
              7.506,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              7.475525856018066,
              7.475536346435547
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a wide, static shot as {woman_in_green_dress} walks closer to {woman_in_white_dress}.",
            "time_intervals": [
              7.505722999572754,
              10.199999809265137
            ]
          },
          {
            "name": "{woman_in_green_dress}",
            "description": "{woman_in_green_dress} walks from the right side of the frame towards the left, closing the distance to stand directly in front of {woman_in_white_dress}.",
            "time_intervals": [
              7.505722999572754,
              10.199999809265137
            ]
          }
        ],
        "data_id": "b438ca3f96697582ef4b80b96add4743",
        "frame_timestamps": [
          33.45333370209104,
          33.52000036875771,
          33.58666703542437,
          33.65333370209104,
          33.7200003687577,
          33.78666703542437,
          33.853333702091035,
          33.920000368757705,
          33.98666703542437,
          34.05333370209104,
          34.1200003687577,
          34.18666703542437,
          34.253333702091034,
          34.320000368757704,
          34.38666703542437,
          34.45333370209104,
          34.52000036875771,
          34.58666703542437,
          34.65333370209104,
          34.7200003687577,
          34.78666703542437,
          34.853333702091035,
          34.920000368757705,
          34.98666703542437,
          35.05333370209104,
          35.1200003687577,
          35.18666703542437,
          35.253333702091034,
          35.320000368757704,
          35.38666703542437,
          35.45333370209104,
          35.52000036875771,
          35.58666703542437,
          35.65333370209104,
          35.7200003687577,
          35.78666703542437,
          35.853333702091035,
          35.920000368757705,
          35.98666703542437,
          36.05333370209104,
          36.1200003687577,
          36.18666703542437,
          36.253333702091034,
          36.320000368757704,
          36.38666703542437,
          36.45333370209104,
          36.52000036875771,
          36.58666703542437,
          36.65333370209104,
          36.7200003687577,
          36.78666703542437,
          36.853333702091035,
          36.920000368757705,
          36.98666703542437,
          37.05333370209104,
          37.1200003687577,
          37.18666703542437,
          37.253333702091034,
          37.320000368757704,
          37.38666703542437,
          37.45333370209104,
          37.52000036875771,
          37.58666703542437,
          37.65333370209104,
          37.7200003687577,
          37.78666703542437,
          37.853333702091035,
          37.920000368757705,
          37.98666703542437,
          38.05333370209104,
          38.1200003687577,
          38.18666703542437,
          38.253333702091034,
          38.320000368757704,
          38.38666703542437,
          38.45333370209104,
          38.52000036875771,
          38.58666703542437,
          38.65333370209104,
          38.7200003687577,
          38.78666703542437,
          38.853333702091035,
          38.920000368757705,
          38.98666703542437,
          39.05333370209104,
          39.1200003687577,
          39.18666703542437,
          39.253333702091034,
          39.320000368757704,
          39.38666703542437,
          39.45333370209104,
          39.52000036875771,
          39.58666703542437,
          39.65333370209104,
          39.7200003687577,
          39.78666703542437,
          39.853333702091035,
          39.920000368757705,
          39.98666703542437,
          40.05333370209104,
          40.1200003687577,
          40.18666703542437,
          40.253333702091034,
          40.320000368757704,
          40.38666703542437,
          40.45333370209104,
          40.52000036875771,
          40.58666703542437,
          40.65333370209104,
          40.7200003687577,
          40.78666703542437,
          40.853333702091035,
          40.920000368757705,
          40.98666703542437,
          41.05333370209104,
          41.1200003687577,
          41.18666703542437,
          41.253333702091034,
          41.320000368757704,
          41.38666703542437,
          41.45333370209104,
          41.52000036875771,
          41.58666703542437,
          41.65333370209103,
          41.7200003687577,
          41.78666703542437,
          41.853333702091035,
          41.920000368757705,
          41.98666703542437,
          42.05333370209104,
          42.1200003687577,
          42.18666703542437,
          42.25333370209104,
          42.320000368757704,
          42.38666703542437,
          42.45333370209104,
          42.52000036875771,
          42.58666703542437,
          42.65333370209103,
          42.7200003687577,
          42.78666703542437,
          42.853333702091035,
          42.920000368757705,
          42.98666703542437,
          43.05333370209104,
          43.1200003687577,
          43.18666703542437,
          43.25333370209104,
          43.320000368757704,
          43.38666703542437,
          43.45333370209104,
          43.52000036875771,
          43.58666703542437
        ]
      },
      "refs": [
        {
          "src": "data/comparisons/06/refs/00_{woman_in_white_dress}.jpg",
          "name": "{woman_in_white_dress}"
        },
        {
          "src": "data/comparisons/06/refs/01_{woman_in_green_dress}.jpg",
          "name": "{woman_in_green_dress}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/06/videos/Ours_720p.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/06/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/06/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/06/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/06/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/06/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Lobby confrontation"
    },
    {
      "seq": "07",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.918,
                3.91801
              ],
              [
                7.018,
                7.018009999999999
              ]
            ]
          },
          {
            "name": "{ancient_scribe}",
            "description": "{ancient_scribe} is an Egyptian scribe in his thirties with closely cropped black hair, kohl-lined dark eyes, a clean shave, deep tan skin. He wears a white linen shendyt kilt, a bare upper body, a beaded necklace of golden carnelian, and gold-banded sandals.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{papyrus_scroll}",
            "description": "{papyrus_scroll} is a long papyrus scroll spread on the floor, partially covered with rows of black hieroglyphic characters drawn in ink.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{reed_pen}",
            "description": "{reed_pen} is a thin reed pen dipped in a small black-pigment dish, in his hand.",
            "time_intervals": [
              [
                0.0,
                7.018
              ]
            ]
          },
          {
            "name": "{scribe_priest}",
            "description": "{scribe_priest} is a senior priest in his sixties beside him in a long pleated white kalasiris and a leopard skin draped, watching.",
            "time_intervals": [
              [
                0.0,
                3.918
              ],
              [
                7.018,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_egyptian_temple}",
            "description": "{scene_egyptian_temple} is the interior of an Egyptian temple library - towering sandstone columns carved with hieroglyphs, painted murals of pharaohs and gods, sandstone floor, scattered papyrus storage shelves, soft warm light filtering through high openings, and the smell of ink and incense.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide of {ancient_scribe} kneeling at {papyrus_scroll}.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{ancient_scribe}",
            "description": "{ancient_scribe} kneels at the scroll, pen poised.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{scribe_priest}",
            "description": "{scribe_priest} stands behind him, robe draped.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{reed_pen}",
            "description": "{reed_pen} dips and writes precisely.",
            "time_intervals": [
              0.0,
              7.018
            ]
          },
          {
            "name": "{papyrus_scroll}",
            "description": "{papyrus_scroll} grows with new characters throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_egyptian_temple}",
            "description": "{scene_egyptian_temple} surrounds with column-light throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the pen.",
            "time_intervals": [
              3.918,
              3.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a top-down close-up of {reed_pen} drawing hieroglyphs.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{ancient_scribe}",
            "description": "{ancient_scribe}'s pen draws delicate hieroglyphs in close-up.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the priest.",
            "time_intervals": [
              7.018,
              7.018009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a medium of {scribe_priest} nodding approvingly over his shoulder.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{ancient_scribe}",
            "description": "{ancient_scribe} sets down the pen, looking up at the priest.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{scribe_priest}",
            "description": "{scribe_priest} nods approvingly in close-up.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          }
        ],
        "summary": "Inside the interior of an Egyptian temple library with towering sandstone columns carved with hieroglyphs, painted murals of pharaohs and gods, sandstone floor, scattered papyrus storage shelves, soft warm light filtering through high openings, and the smell of ink and incense, an Egyptian scribe in his thirties with closely cropped black hair, kohl-lined dark eyes, clean shave, deep tan skin, white linen shendyt kilt, bare upper body, beaded carnelian necklace, and gold-banded sandals kneels at a long papyrus scroll partially covered with rows of black hieroglyphic characters. A senior priest in his sixties in a pleated white kalasiris and leopard skin watches. The camera opens on a wide. A hard cut at four seconds tightens to a top-down close-up of a thin reed pen drawing delicate hieroglyphs. A final hard cut at seven seconds tightens to a medium of the priest nodding approvingly."
      },
      "refs": [
        {
          "src": "data/comparisons/07/refs/00_ancient_scribe.jpg",
          "name": "{ancient_scribe}"
        },
        {
          "src": "data/comparisons/07/refs/01_papyrus_scroll.jpg",
          "name": "{papyrus_scroll}"
        },
        {
          "src": "data/comparisons/07/refs/02_reed_pen.jpg",
          "name": "{reed_pen}"
        },
        {
          "src": "data/comparisons/07/refs/03_scribe_priest.jpg",
          "name": "{scribe_priest}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/07/videos/CineOrchestra.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/07/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/07/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/07/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/07/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/07/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Egyptian temple"
    },
    {
      "seq": "08",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                9.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.918,
                2.91801
              ],
              [
                6.018,
                6.018009999999999
              ]
            ]
          },
          {
            "name": "{medieval_alchemist}",
            "description": "{medieval_alchemist} is a medieval European alchemist in his sixties with a long white beard, a balding crown with wisps of white hair, intense pale gray eyes, weathered hands. He wears a long dark blue robe with silver moon-and-star embroidery, a leather belt with pouches, and worn leather slippers.",
            "time_intervals": [
              [
                0.0,
                9.199999809265137
              ]
            ]
          },
          {
            "name": "{glass_alembic}",
            "description": "{glass_alembic} is a complex glass alembic distillation apparatus with bubbling glowing-green liquid in a flask over a fire.",
            "time_intervals": [
              [
                0.0,
                2.918
              ],
              [
                6.018,
                9.199999809265137
              ]
            ]
          },
          {
            "name": "{ancient_grimoire}",
            "description": "{ancient_grimoire} is an ancient leather-bound grimoire with cracked spine and yellowed pages, open on a wooden lectern.",
            "time_intervals": [
              [
                0.0,
                2.918
              ],
              [
                6.018,
                9.199999809265137
              ]
            ]
          },
          {
            "name": "{shelves_strange_jars}",
            "description": "{shelves_strange_jars} are shelves of strange jars and bottles - dried herbs, animal skulls, mysterious crystals, and labeled apothecary jars in Latin.",
            "time_intervals": [
              [
                0.0,
                2.918
              ],
              [
                6.018,
                9.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_alchemist_lab}",
            "description": "{scene_alchemist_lab} is the cluttered laboratory of a medieval alchemist - a stone tower room, vaulted ceiling, scattered candles, glass flasks bubbling on iron stands, ancient maps and astrology charts pinned to walls, hanging dried herbs from the ceiling, and the warm flickering glow of fire and candles.",
            "time_intervals": [
              [
                0.0,
                9.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide of {medieval_alchemist} bent over {glass_alembic}.",
            "time_intervals": [
              0.0,
              2.918
            ]
          },
          {
            "name": "{medieval_alchemist}",
            "description": "{medieval_alchemist} stirs the alembic with a wooden rod.",
            "time_intervals": [
              0.0,
              2.918
            ]
          },
          {
            "name": "{glass_alembic}",
            "description": "{glass_alembic} bubbles green throughout.",
            "time_intervals": [
              0.0,
              2.918
            ]
          },
          {
            "name": "{ancient_grimoire}",
            "description": "{ancient_grimoire} sits open on the lectern.",
            "time_intervals": [
              0.0,
              2.918
            ]
          },
          {
            "name": "{shelves_strange_jars}",
            "description": "{shelves_strange_jars} surround with strange specimens.",
            "time_intervals": [
              0.0,
              2.918
            ]
          },
          {
            "name": "{scene_alchemist_lab}",
            "description": "{scene_alchemist_lab} flickers with candle and fire light throughout.",
            "time_intervals": [
              0.0,
              9.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to his eyes.",
            "time_intervals": [
              2.918,
              2.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up of his eyes reflecting the green glow.",
            "time_intervals": [
              2.918,
              6.018
            ]
          },
          {
            "name": "{medieval_alchemist}",
            "description": "{medieval_alchemist}'s eyes widen, reflecting green.",
            "time_intervals": [
              2.918,
              6.018
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to his triumph.",
            "time_intervals": [
              6.018,
              6.018009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a medium of him laughing and raising his hands triumphantly.",
            "time_intervals": [
              6.018,
              9.199999809265137
            ]
          },
          {
            "name": "{medieval_alchemist}",
            "description": "{medieval_alchemist} laughs and raises his hands triumphantly.",
            "time_intervals": [
              6.018,
              9.199999809265137
            ]
          },
          {
            "name": "{glass_alembic}",
            "description": "{glass_alembic} bubbles green throughout.",
            "time_intervals": [
              6.018,
              9.199999809265137
            ]
          },
          {
            "name": "{ancient_grimoire}",
            "description": "{ancient_grimoire} sits open on the lectern.",
            "time_intervals": [
              6.018,
              9.199999809265137
            ]
          },
          {
            "name": "{shelves_strange_jars}",
            "description": "{shelves_strange_jars} surround with strange specimens.",
            "time_intervals": [
              6.018,
              9.199999809265137
            ]
          }
        ],
        "summary": "Inside the cluttered laboratory of a medieval alchemist - a stone tower room with vaulted ceiling, scattered candles, glass flasks bubbling on iron stands, ancient maps and astrology charts pinned to walls, hanging dried herbs, warm flickering glow of fire and candles, shelves of strange jars - dried herbs, animal skulls, mysterious crystals, Latin apothecary jars - and an ancient leather-bound grimoire on a wooden lectern, a medieval European alchemist in his sixties with long white beard, balding crown with white wisps, intense pale gray eyes, weathered hands, long dark blue robe with silver moon-and-star embroidery, leather pouch belt, and worn leather slippers stirs a complex glass alembic with bubbling glowing-green liquid. The camera opens on a wide. A hard cut at four seconds tightens to his eyes reflecting the green glow. A final hard cut at seven seconds tightens to a medium of him laughing and raising his hands triumphantly."
      },
      "refs": [
        {
          "src": "data/comparisons/08/refs/00_medieval_alchemist.jpg",
          "name": "{medieval_alchemist}"
        },
        {
          "src": "data/comparisons/08/refs/01_glass_alembic.jpg",
          "name": "{glass_alembic}"
        },
        {
          "src": "data/comparisons/08/refs/02_ancient_grimoire.jpg",
          "name": "{ancient_grimoire}"
        },
        {
          "src": "data/comparisons/08/refs/03_shelves_strange_jars.jpg",
          "name": "{shelves_strange_jars}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/08/videos/CineOrchestra.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/08/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/08/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/08/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/08/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/08/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "duration": 9.2,
      "desc": "Medieval alchemy"
    },
    {
      "seq": "09",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                3.518
              ],
              [
                3.518,
                7.018
              ],
              [
                7.018,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.518,
                3.51801
              ],
              [
                7.018,
                7.018009999999999
              ]
            ]
          },
          {
            "name": "{grandma_lucia}",
            "description": "{grandma_lucia} is an Italian-American grandmother in her seventies with neatly set silver hair, kind dark eyes, rosy cheeks, and a soft smile. She wears a cream cable-knit cardigan over a long burgundy apron, a pair of pearl earrings, and a small gold cross necklace.",
            "time_intervals": [
              [
                0.0,
                3.518
              ],
              [
                3.518,
                7.018
              ],
              [
                7.018,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{family_around_table}",
            "description": "{family_around_table} is a multigenerational family of about ten \u2014 children, parents, and grandparents of mixed ages \u2014 seated around the long dining table in casual fall sweaters and button-downs, hands in laps, smiling.",
            "time_intervals": [
              [
                0.0,
                3.518
              ],
              [
                3.518,
                7.018
              ],
              [
                7.018,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{roasted_turkey}",
            "description": "{roasted_turkey} is a glistening golden-brown roasted turkey on a large white-and-blue ceramic platter, garnished with rosemary sprigs and orange wedges.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{dining_table_spread}",
            "description": "{dining_table_spread} is a long oak dining table laden with bowls of mashed potatoes, gravy boat, cranberry sauce, green beans, sweet potato casserole, and basket of dinner rolls, with white linen napkins folded at each place.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_warm_dining_room}",
            "description": "{scene_warm_dining_room} is a warm New England dining room on Thanksgiving \u2014 wood-paneled walls, an antique brass chandelier above, autumn-leaf wreaths, framed family photographs along one wall, and a fire crackling in the hearth in the next room.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a high overhead shot of {dining_table_spread} from above.",
            "time_intervals": [
              0.0,
              3.518
            ]
          },
          {
            "name": "{grandma_lucia}",
            "description": "{grandma_lucia} carries the platter with both hands from the kitchen toward the table.",
            "time_intervals": [
              0.0,
              3.518
            ]
          },
          {
            "name": "{family_around_table}",
            "description": "{family_around_table} sits already at the table, talking, gesturing, mugs in hand.",
            "time_intervals": [
              0.0,
              3.518
            ]
          },
          {
            "name": "{roasted_turkey}",
            "description": "{roasted_turkey} steams gently as it is carried and placed.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{dining_table_spread}",
            "description": "{dining_table_spread} fills the table with bowls of sides, gravy boat, and breadbasket throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_warm_dining_room}",
            "description": "{scene_warm_dining_room} surrounds the meal with chandelier glow and crackling hearth throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to {grandma_lucia}.",
            "time_intervals": [
              3.518,
              3.51801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a medium of {grandma_lucia} carrying {roasted_turkey} to the table.",
            "time_intervals": [
              3.518,
              7.018
            ]
          },
          {
            "name": "{grandma_lucia}",
            "description": "{grandma_lucia} sets {roasted_turkey} at the head of the table with a proud smile.",
            "time_intervals": [
              3.518,
              7.018
            ]
          },
          {
            "name": "{family_around_table}",
            "description": "{family_around_table} watches the turkey arrive, several leaning forward.",
            "time_intervals": [
              3.518,
              7.018
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the family reverse.",
            "time_intervals": [
              7.018,
              7.018009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a wide reverse shot of {family_around_table} reacting in delight.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{grandma_lucia}",
            "description": "{grandma_lucia} pats one grandchild's head and laughs.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{family_around_table}",
            "description": "{family_around_table} bursts into delight, several clapping, kids leaning across.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          }
        ],
        "summary": "Inside a warm New England dining room on Thanksgiving \u2014 wood-paneled walls, an antique brass chandelier above, autumn-leaf wreaths, framed family photographs along one wall, and a fire crackling in the next room's hearth \u2014 a long oak dining table is laden with bowls of mashed potatoes, gravy boat, cranberry sauce, green beans, sweet potato casserole, and a basket of dinner rolls with white linen napkins folded at each place, ringed by a multigenerational family of about ten. An Italian-American grandmother in her seventies with set silver hair, kind dark eyes, rosy cheeks, soft smile, cream cable-knit cardigan over a long burgundy apron, pearl earrings, and a small gold cross carries a glistening golden roasted turkey on a white-and-blue ceramic platter garnished with rosemary and oranges. The camera opens on a high overhead shot of the spread. A hard cut at three and a half seconds tightens to a medium as she sets the turkey at the head of the table with a proud smile. A final hard cut at seven seconds reverses to a wide as the family bursts into delight \u2014 several clapping, kids leaning across \u2014 and she pats a grandchild's head."
      },
      "refs": [
        {
          "src": "data/comparisons/09/refs/00_{grandma_lucia}.jpg",
          "name": "{grandma_lucia}"
        },
        {
          "src": "data/comparisons/09/refs/01_{family_around_table}.jpg",
          "name": "{family_around_table}"
        },
        {
          "src": "data/comparisons/09/refs/02_{roasted_turkey}.jpg",
          "name": "{roasted_turkey}"
        },
        {
          "src": "data/comparisons/09/refs/03_{dining_table_spread}.jpg",
          "name": "{dining_table_spread}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/09/videos/Ours.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/09/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/09/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/09/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/09/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/09/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Thanksgiving dinner"
    },
    {
      "seq": "10",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                8.999999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.718,
                2.7180100000000005
              ],
              [
                5.818,
                5.818009999999999
              ]
            ]
          },
          {
            "name": "{1700s_pirate_captain}",
            "description": "{1700s_pirate_captain} is an 18th-century pirate captain in his late thirties with long black hair tied back with a red bandana, a thick black beard with red beads, a scarred eye covered by a black eyepatch, sun-bronzed skin. He wears a long red velvet coat with brass buttons, a frilled white shirt, black sash with two flintlock pistols, dark breeches, and tall cuff-top sea boots.",
            "time_intervals": [
              [
                0.0,
                8.999999809265137
              ]
            ]
          },
          {
            "name": "{pirate_first_mate}",
            "description": "{pirate_first_mate} is his stocky first mate beside him in a striped blue-and-white shirt, a tricorne hat, leather vest, dark breeches, and a cutlass.",
            "time_intervals": [
              [
                0.0,
                2.718
              ]
            ]
          },
          {
            "name": "{ship_wheel}",
            "description": "{ship_wheel} is the large wooden ship's wheel on the quarterdeck, with brass spokes.",
            "time_intervals": [
              [
                0.0,
                2.718
              ]
            ]
          },
          {
            "name": "{jolly_roger}",
            "description": "{jolly_roger} is the black Jolly Roger flag with skull-and-crossbones snapping in the wind atop the mainmast.",
            "time_intervals": [
              [
                0.0,
                2.718
              ],
              [
                5.818,
                8.999999809265137
              ]
            ]
          },
          {
            "name": "{scene_pirate_ship_deck}",
            "description": "{scene_pirate_ship_deck} is the deck of a pirate sloop on the Caribbean - dark wooden planks, three masts of red-and-white-striped sails, scattered cannon along the gunwales, coils of rope, a sea-spattered captain's quarters door, and bright tropical sun.",
            "time_intervals": [
              [
                0.0,
                8.999999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide low-angle of {1700s_pirate_captain} at {ship_wheel}.",
            "time_intervals": [
              0.0,
              2.718
            ]
          },
          {
            "name": "{1700s_pirate_captain}",
            "description": "{1700s_pirate_captain} stands at the wheel, coat flapping.",
            "time_intervals": [
              0.0,
              2.718
            ]
          },
          {
            "name": "{pirate_first_mate}",
            "description": "{pirate_first_mate} stands at his side throughout.",
            "time_intervals": [
              0.0,
              2.718
            ]
          },
          {
            "name": "{ship_wheel}",
            "description": "{ship_wheel} turns under his hands.",
            "time_intervals": [
              0.0,
              2.718
            ]
          },
          {
            "name": "{jolly_roger}",
            "description": "{jolly_roger} snaps in the wind throughout.",
            "time_intervals": [
              0.0,
              2.718
            ]
          },
          {
            "name": "{scene_pirate_ship_deck}",
            "description": "{scene_pirate_ship_deck} surrounds with bright tropical sun throughout.",
            "time_intervals": [
              0.0,
              8.999999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to his face.",
            "time_intervals": [
              2.718,
              2.7180100000000005
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up of his eyepatched face squinting at the horizon.",
            "time_intervals": [
              2.718,
              5.818
            ]
          },
          {
            "name": "{1700s_pirate_captain}",
            "description": "{1700s_pirate_captain}'s eye narrows at the horizon.",
            "time_intervals": [
              2.718,
              5.818
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the flag.",
            "time_intervals": [
              5.818,
              5.818009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a wide of {jolly_roger} snapping in the wind.",
            "time_intervals": [
              5.818,
              8.999999809265137
            ]
          },
          {
            "name": "{1700s_pirate_captain}",
            "description": "{1700s_pirate_captain} bellows 'Hoist the Jolly Roger!'.",
            "time_intervals": [
              5.818,
              8.999999809265137
            ]
          },
          {
            "name": "{jolly_roger}",
            "description": "{jolly_roger} snaps in the wind throughout.",
            "time_intervals": [
              5.818,
              8.999999809265137
            ]
          }
        ],
        "summary": "On the deck of a pirate sloop on the Caribbean - dark wooden planks, three masts of red-and-white-striped sails, scattered cannon along the gunwales, coils of rope, a sea-spattered captain's quarters door, and bright tropical sun - an 18th-century pirate captain in his late thirties with long black hair tied back with a red bandana, thick black beard with red beads, scarred eyepatch, sun-bronzed skin, long red velvet coat with brass buttons, frilled white shirt, black sash with two flintlock pistols, dark breeches, and tall cuff-top sea boots stands at a large wooden ship's wheel with brass spokes beside his stocky first mate in striped blue-and-white shirt, tricorne, leather vest, breeches, and cutlass. A black Jolly Roger flag snaps atop the mainmast. The camera opens on a wide low-angle. A hard cut at four seconds tightens to a close-up of his eyepatched face squinting. A final hard cut at seven seconds widens to the flag snapping as he bellows 'Hoist the Jolly Roger!'."
      },
      "refs": [
        {
          "src": "data/comparisons/10/refs/00_1700s_pirate_captain.jpg",
          "name": "{1700s_pirate_captain}"
        },
        {
          "src": "data/comparisons/10/refs/01_pirate_first_mate.jpg",
          "name": "{pirate_first_mate}"
        },
        {
          "src": "data/comparisons/10/refs/02_ship_wheel.jpg",
          "name": "{ship_wheel}"
        },
        {
          "src": "data/comparisons/10/refs/03_jolly_roger.jpg",
          "name": "{jolly_roger}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/10/videos/CineOrchestra.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/10/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/10/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/10/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/10/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/10/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "duration": 9.0,
      "desc": "Pirate ship deck"
    },
    {
      "seq": "11",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                1.2179545164108276
              ],
              [
                1.2179545164108276,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                1.3991386890411377,
                1.399148941040039
              ]
            ]
          },
          {
            "name": "{woman_blonde}",
            "description": "{woman_blonde} is a young, fair-skinned woman with long blonde hair. She is wearing a light brown cowboy hat, a black fleece zip-up jacket over a patterned scarf, and light-colored pants.",
            "time_intervals": [
              [
                1.2179545164108276,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{man_older}",
            "description": "{man_older} is an older, bald, fair-skinned man. He is wearing a heavy, olive-green safari jacket with a logo on the left chest and light-colored pants.",
            "time_intervals": [
              [
                1.2179545164108276,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{lion_cub_petted}",
            "description": "{lion_cub_petted} is a young lion cub with light, tawny fur and faint spots on its body and legs.",
            "time_intervals": [
              [
                1.2179545164108276,
                5.445586204528809
              ],
              [
                5.445586204528809,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{walking_stick}",
            "description": "{walking_stick} is a simple, long, dark brown wooden staff used for walking and interacting with the lions.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_savanna}",
            "description": "{scene_savanna} is a vast, open, dry grassy field under a clear, light blue sky. The landscape is dotted with a few sparse, dry trees and bushes, and the ground is covered in golden-brown grass, illuminated by the warm light of a low sun.",
            "time_intervals": [
              [
                1.2179545164108276,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_river_aerial}",
            "description": "{scene_river_aerial} is an aerial view of a wide, dark river snaking through the dry, brown savanna. The river's surface is covered in large patches of bright green algae or aquatic vegetation.",
            "time_intervals": [
              [
                0.0,
                1.2179545164108276
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} is in an aerial shot, moving forward quickly over {scene_river_aerial}.",
            "time_intervals": [
              0.0,
              1.2179545164108276
            ]
          },
          {
            "name": "{scene_river_aerial}",
            "description": "{scene_river_aerial} is shown in a fast-moving forward tracking shot.",
            "time_intervals": [
              0.0,
              1.2179545164108276
            ]
          },
          {
            "name": "{walking_stick}",
            "description": "{walking_stick} is held by {woman_blonde} and {man_older}.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{lion_cub_petted}",
            "description": "{lion_cub_petted} lies on its back with its paws in the air.",
            "time_intervals": [
              1.2179545164108276,
              5.445586204528809
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a static, very low-angle shot of the group.",
            "time_intervals": [
              1.2179545164108276,
              10.199999809265137
            ]
          },
          {
            "name": "{woman_blonde}",
            "description": "{woman_blonde} squats beside {lion_cub_petted}, holding a {walking_stick}, and listens as {man_older} talks.",
            "time_intervals": [
              1.2179545164108276,
              10.199999809265137
            ]
          },
          {
            "name": "{man_older}",
            "description": "{man_older} squats and continues to talk to {woman_blonde}, gesturing with both hands for emphasis.",
            "time_intervals": [
              1.2179545164108276,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_savanna}",
            "description": "{scene_savanna} is the setting for the interaction between people and lions.",
            "time_intervals": [
              1.2179545164108276,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut.",
            "time_intervals": [
              1.3991386890411377,
              1.399148941040039
            ]
          },
          {
            "name": "{lion_cub_petted}",
            "description": "{lion_cub_petted} licks its front right paw while continuing to lie on its back.",
            "time_intervals": [
              5.445586204528809,
              10.199999809265137
            ]
          }
        ],
        "data_id": "e85f3164d7d9fdfe11a36707688c7fb5",
        "frame_timestamps": [
          40.590005898595585,
          40.656672565262255,
          40.72333923192892,
          40.79000589859559,
          40.85667256526225,
          40.92333923192892,
          40.990005898595584,
          41.056672565262254,
          41.12333923192892,
          41.19000589859559,
          41.25667256526225,
          41.32333923192892,
          41.39000589859558,
          41.45667256526225,
          41.523339231928915,
          41.590005898595585,
          41.656672565262255,
          41.72333923192892,
          41.79000589859559,
          41.85667256526225,
          41.92333923192892,
          41.990005898595584,
          42.056672565262254,
          42.12333923192892,
          42.19000589859559,
          42.25667256526225,
          42.32333923192892,
          42.39000589859558,
          42.45667256526225,
          42.523339231928915,
          42.590005898595585,
          42.656672565262255,
          42.72333923192892,
          42.79000589859559,
          42.85667256526225,
          42.92333923192892,
          42.990005898595584,
          43.056672565262254,
          43.12333923192892,
          43.19000589859559,
          43.25667256526225,
          43.32333923192892,
          43.39000589859558,
          43.45667256526225,
          43.523339231928915,
          43.590005898595585,
          43.656672565262255,
          43.72333923192892,
          43.79000589859559,
          43.85667256526225,
          43.92333923192892,
          43.990005898595584,
          44.056672565262254,
          44.12333923192892,
          44.19000589859559,
          44.25667256526225,
          44.32333923192892,
          44.39000589859558,
          44.45667256526225,
          44.523339231928915,
          44.590005898595585,
          44.656672565262255,
          44.72333923192892,
          44.79000589859559,
          44.85667256526225,
          44.92333923192892,
          44.990005898595584,
          45.056672565262254,
          45.12333923192892,
          45.19000589859559,
          45.25667256526225,
          45.32333923192892,
          45.39000589859558,
          45.45667256526225,
          45.523339231928915,
          45.590005898595585,
          45.656672565262255,
          45.72333923192892,
          45.79000589859559,
          45.85667256526225,
          45.92333923192892,
          45.990005898595584,
          46.056672565262254,
          46.12333923192892,
          46.19000589859559,
          46.25667256526225,
          46.32333923192892,
          46.39000589859558,
          46.45667256526225,
          46.523339231928915,
          46.590005898595585,
          46.656672565262255,
          46.72333923192892,
          46.79000589859559,
          46.85667256526225,
          46.92333923192892,
          46.990005898595584,
          47.056672565262254,
          47.12333923192892,
          47.19000589859559,
          47.25667256526225,
          47.32333923192892,
          47.39000589859558,
          47.45667256526225,
          47.523339231928915,
          47.590005898595585,
          47.656672565262255,
          47.72333923192892,
          47.79000589859559,
          47.85667256526225,
          47.92333923192892,
          47.990005898595584,
          48.056672565262254,
          48.12333923192892,
          48.19000589859559,
          48.25667256526225,
          48.32333923192892,
          48.39000589859558,
          48.45667256526225,
          48.523339231928915,
          48.590005898595585,
          48.656672565262255,
          48.72333923192892,
          48.79000589859558,
          48.85667256526225,
          48.92333923192892,
          48.990005898595584,
          49.056672565262254,
          49.12333923192892,
          49.19000589859559,
          49.25667256526225,
          49.32333923192892,
          49.39000589859559,
          49.45667256526225,
          49.523339231928915,
          49.590005898595585,
          49.656672565262255,
          49.72333923192892,
          49.79000589859558,
          49.85667256526225,
          49.92333923192892,
          49.990005898595584,
          50.056672565262254,
          50.12333923192892,
          50.19000589859559,
          50.25667256526225,
          50.32333923192892,
          50.39000589859559,
          50.45667256526225,
          50.523339231928915,
          50.590005898595585,
          50.656672565262255,
          50.72333923192892
        ]
      },
      "refs": [
        {
          "src": "data/comparisons/11/refs/00_{woman_blonde}.jpg",
          "name": "{woman_blonde}"
        },
        {
          "src": "data/comparisons/11/refs/01_{man_older}.jpg",
          "name": "{man_older}"
        },
        {
          "src": "data/comparisons/11/refs/02_{lion_cub_petted}.jpg",
          "name": "{lion_cub_petted}"
        },
        {
          "src": "data/comparisons/11/refs/03_{walking_stick}.jpg",
          "name": "{walking_stick}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/11/videos/Ours_720p.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/11/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/11/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/11/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/11/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/11/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Savanna safari"
    },
    {
      "seq": "12",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                2.812
              ],
              [
                2.812,
                4.918
              ],
              [
                5.421,
                7.713
              ],
              [
                7.713,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.812,
                2.81201
              ],
              [
                4.918,
                5.421
              ],
              [
                7.713,
                7.71301
              ]
            ]
          },
          {
            "name": "{magician_cyril}",
            "description": "{magician_cyril} is a tall lean white man in his late forties with slicked-back jet-black hair, a thin pencil mustache, and dark eyes. He wears a black tailcoat with satin lapels over a starched white shirt, a deep purple cravat, white gloves, and a tall black silk top hat tipped at a rakish angle.",
            "time_intervals": [
              [
                0.0,
                2.812
              ],
              [
                2.812,
                4.918
              ],
              [
                5.421,
                7.713
              ],
              [
                7.713,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{assistant_lina}",
            "description": "{assistant_lina} is a Vietnamese woman in her late twenties with long black hair coiled in elaborate curls, glittering rhinestone earrings, and dramatic stage makeup. She wears a sequined royal-purple leotard, sheer black tights, and silver heeled shoes, posed gracefully with one arm raised.",
            "time_intervals": [
              [
                0.0,
                4.918
              ],
              [
                9.412,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{magic_box}",
            "description": "{magic_box} is a tall lacquered black wooden cabinet with gold filigree along its edges, double doors that swing open from the front, and a small star-shaped peephole near the top.",
            "time_intervals": [
              [
                0.0,
                2.812
              ],
              [
                2.812,
                5.421
              ],
              [
                5.421,
                7.713
              ],
              [
                7.713,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{stage_audience}",
            "description": "{stage_audience} is a packed theatre audience in formal evening wear, faintly visible at the edge of the stage spotlights, leaning forward in their plush red velvet seats.",
            "time_intervals": [
              [
                0.0,
                7.713
              ],
              [
                7.713,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_grand_stage}",
            "description": "{scene_grand_stage} is the grand stage of a vintage opera house with deep red velvet curtains drawn back, gilded proscenium arches, a polished wooden stage floor, two crystal chandeliers hanging high above, and warm theatrical footlights washing the stage.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} is a wide static shot of the grand stage, framing {magician_cyril} and {assistant_lina} beside {magic_box}.",
            "time_intervals": [
              0.0,
              2.812
            ]
          },
          {
            "name": "{magician_cyril}",
            "description": "{magician_cyril} bows extravagantly to the audience, gesturing toward {assistant_lina} with his top hat.",
            "time_intervals": [
              0.0,
              2.812
            ]
          },
          {
            "name": "{magic_box}",
            "description": "{magic_box} stands centerstage with its doors open, awaiting {assistant_lina}.",
            "time_intervals": [
              0.0,
              2.812
            ]
          },
          {
            "name": "{assistant_lina}",
            "description": "{assistant_lina} steps gracefully into {magic_box}, pirouetting as the doors close behind her.",
            "time_intervals": [
              0.0,
              4.918
            ]
          },
          {
            "name": "{stage_audience}",
            "description": "{stage_audience} watches in hushed anticipation along the dim outer edges of the spotlights.",
            "time_intervals": [
              0.0,
              7.713
            ]
          },
          {
            "name": "{scene_grand_stage}",
            "description": "{scene_grand_stage} surrounds the act with red velvet curtains, gilded arches, and warm footlights throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the close-up of Cyril's face.",
            "time_intervals": [
              2.812,
              2.81201
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up on {magician_cyril}'s face as he lifts his white-gloved hands.",
            "time_intervals": [
              2.812,
              4.918
            ]
          },
          {
            "name": "{magician_cyril}",
            "description": "{magician_cyril} stares intently into the camera, raising both gloved hands slowly.",
            "time_intervals": [
              2.812,
              4.918
            ]
          },
          {
            "name": "{magic_box}",
            "description": "{magic_box} is closed, faintly trembling.",
            "time_intervals": [
              2.812,
              5.421
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a half-second dissolve through purple smoke to the low-angle on the box.",
            "time_intervals": [
              4.918,
              5.421
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} dissolves to a low-angle shot looking up at {magic_box} as smoke pours from its base.",
            "time_intervals": [
              5.421,
              7.713
            ]
          },
          {
            "name": "{magician_cyril}",
            "description": "{magician_cyril} stands beside {magic_box}, snapping his fingers as smoke billows upward.",
            "time_intervals": [
              5.421,
              7.713
            ]
          },
          {
            "name": "{magic_box}",
            "description": "{magic_box} fills the low-angle frame, dramatic purple smoke pouring from its base.",
            "time_intervals": [
              5.421,
              7.713
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the wide reveal of the empty box.",
            "time_intervals": [
              7.713,
              7.71301
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a wide reveal of the empty box, then pans up as {assistant_lina} reappears in the back balcony.",
            "time_intervals": [
              7.713,
              10.199999809265137
            ]
          },
          {
            "name": "{magician_cyril}",
            "description": "{magician_cyril} pulls open the doors of {magic_box} with a flourish to reveal it empty, then sweeps his arm toward the back balcony.",
            "time_intervals": [
              7.713,
              10.199999809265137
            ]
          },
          {
            "name": "{magic_box}",
            "description": "{magic_box} stands open and clearly empty as {magician_cyril} steps inside it.",
            "time_intervals": [
              7.713,
              10.199999809265137
            ]
          },
          {
            "name": "{stage_audience}",
            "description": "{stage_audience} bursts into thunderous applause as the trick is revealed.",
            "time_intervals": [
              7.713,
              10.199999809265137
            ]
          },
          {
            "name": "{assistant_lina}",
            "description": "{assistant_lina} suddenly appears standing at the rear of the audience in the back balcony, arms outstretched, smiling broadly.",
            "time_intervals": [
              9.412,
              10.199999809265137
            ]
          }
        ],
        "summary": "On the grand stage of a vintage opera house with deep red velvet curtains drawn back, gilded proscenium arches, a polished wooden stage floor, crystal chandeliers high above, and warm theatrical footlights, a tall lean white magician in his late forties with slicked-back jet-black hair, a thin pencil mustache, a black tailcoat with satin lapels over a starched white shirt, a deep purple cravat, white gloves, and a tall silk top hat tipped at a rakish angle bows extravagantly to a packed audience in formal evening wear and gestures with his hat toward his assistant \u2014 a Vietnamese woman in her late twenties with elaborate coiled black curls, rhinestone earrings, dramatic stage makeup, a sequined royal-purple leotard, sheer black tights, and silver heeled shoes \u2014 who pirouettes into a tall lacquered black wooden cabinet with gold filigree, double front doors, and a star-shaped peephole. The wide static holds for nearly three seconds before hard-cutting to a tight close-up of his face raising both gloved hands, then dissolving over half a second through purple smoke to a low-angle on the box as he snaps his fingers and smoke billows upward. A final hard cut reveals the box wide open and empty as he steps inside it then sweeps his arm toward the back balcony where the assistant has reappeared with arms outstretched, the audience erupting into thunderous applause."
      },
      "refs": [
        {
          "src": "data/comparisons/12/refs/00_{magician_cyril}.jpg",
          "name": "{magician_cyril}"
        },
        {
          "src": "data/comparisons/12/refs/01_{assistant_lina}.jpg",
          "name": "{assistant_lina}"
        },
        {
          "src": "data/comparisons/12/refs/02_{magic_box}.jpg",
          "name": "{magic_box}"
        },
        {
          "src": "data/comparisons/12/refs/03_{stage_audience}.jpg",
          "name": "{stage_audience}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/12/videos/Ours.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/12/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/12/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/12/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/12/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/12/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Magic show"
    },
    {
      "seq": "13",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                4.715779781341553
              ],
              [
                4.715779781341553,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                4.886898040771484,
                4.886908531188965
              ]
            ]
          },
          {
            "name": "{scene_ocean}",
            "description": "{scene_ocean} is a large body of water, appearing green-blue in the bright sunlight, with small ripples across its surface.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_boat_deck}",
            "description": "{scene_boat_deck} is the white-painted deck of a fishing boat, featuring a dark, weathered wooden railing, and a white cabin wall with holders for fishing rods.",
            "time_intervals": [
              [
                0.0,
                4.715779781341553
              ]
            ]
          },
          {
            "name": "{man_green_shirt}",
            "description": "{man_green_shirt} is a man with a dark, graying beard and mustache, wearing a bright, neon-green t-shirt and a camo-patterned baseball cap.",
            "time_intervals": [
              [
                0.0,
                1.5651878118515015
              ],
              [
                1.5651878118515015,
                4.715779781341553
              ]
            ]
          },
          {
            "name": "{man_blue_hoodie}",
            "description": "{man_blue_hoodie} is a man with long, dark hair, a dark beard, and a tan complexion, wearing a dark blue hoodie with 'STARDUST SPORTFISHING' written on it.",
            "time_intervals": [
              [
                0.0,
                1.5651878118515015
              ],
              [
                1.5651878118515015,
                4.715779781341553
              ],
              [
                6.688674449920654,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{fish_red_1}",
            "description": "{fish_red_1} is a large, vibrant orange-red fish with prominent spiny fins, large eyes, and a wide-open mouth.",
            "time_intervals": [
              [
                0.0,
                4.715779781341553
              ]
            ]
          },
          {
            "name": "{fish_red_2}",
            "description": "{fish_red_2} is a medium-sized, orange-red fish with white patches on its side.",
            "time_intervals": [
              [
                0.0,
                4.715779781341553
              ]
            ]
          },
          {
            "name": "{fish_red_3}",
            "description": "{fish_red_3} is a smaller, orange-brown fish caught on a fishing line.",
            "time_intervals": [
              [
                0.0,
                4.715779781341553
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{man_green_shirt}",
            "description": "{man_green_shirt} stands next to {man_blue_hoodie} as his catch of three red fish is brought up.",
            "time_intervals": [
              0.0,
              1.5651878118515015
            ]
          },
          {
            "name": "{man_blue_hoodie}",
            "description": "{man_blue_hoodie} helps {man_green_shirt}, holding up the line with three red fish.",
            "time_intervals": [
              0.0,
              1.5651878118515015
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} is handheld, focusing on {man_green_shirt} and {man_blue_hoodie} with their catch.",
            "time_intervals": [
              0.0,
              4.715779781341553
            ]
          },
          {
            "name": "{scene_boat_deck}",
            "description": "{scene_boat_deck} provides the setting as {man_green_shirt} and {man_blue_hoodie} examine the caught red fish.",
            "time_intervals": [
              0.0,
              4.715779781341553
            ]
          },
          {
            "name": "{fish_red_1}",
            "description": "{fish_red_1} is held up by {man_blue_hoodie} while he unhooks it.",
            "time_intervals": [
              0.0,
              4.715779781341553
            ]
          },
          {
            "name": "{fish_red_2}",
            "description": "{fish_red_2} hangs from the line as {man_blue_hoodie} holds it up.",
            "time_intervals": [
              0.0,
              4.715779781341553
            ]
          },
          {
            "name": "{fish_red_3}",
            "description": "{fish_red_3} hangs from the line as {man_blue_hoodie} holds it up.",
            "time_intervals": [
              0.0,
              4.715779781341553
            ]
          },
          {
            "name": "{scene_ocean}",
            "description": "{scene_ocean} is the background for the entire video, with its surface visible below the fishing boat.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{man_green_shirt}",
            "description": "{man_green_shirt} smiles and watches as {man_blue_hoodie} unhooks his fish.",
            "time_intervals": [
              1.5651878118515015,
              4.715779781341553
            ]
          },
          {
            "name": "{man_blue_hoodie}",
            "description": "{man_blue_hoodie} smiles as he unhooks the red fish from the line.",
            "time_intervals": [
              1.5651878118515015,
              4.715779781341553
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} tilts down to follow a fish being unhooked and released back into the water.",
            "time_intervals": [
              4.715779781341553,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut from men examining their catch to an overhead view of fish in the water.",
            "time_intervals": [
              4.886898040771484,
              4.886908531188965
            ]
          },
          {
            "name": "{man_blue_hoodie}",
            "description": "{man_blue_hoodie} holds a fishing line and unhooks another red fish, then lets it go back into the water.",
            "time_intervals": [
              6.688674449920654,
              10.199999809265137
            ]
          }
        ],
        "data_id": "f80b8b9a9f3e965ee2954f91faeacfac",
        "frame_timestamps": [
          37.1450421787503,
          37.21170884541697,
          37.278375512083635,
          37.345042178750305,
          37.41170884541697,
          37.47837551208364,
          37.5450421787503,
          37.61170884541697,
          37.67837551208363,
          37.7450421787503,
          37.811708845416966,
          37.878375512083636,
          37.9450421787503,
          38.01170884541697,
          38.07837551208363,
          38.1450421787503,
          38.21170884541697,
          38.278375512083635,
          38.345042178750305,
          38.41170884541697,
          38.47837551208364,
          38.5450421787503,
          38.61170884541697,
          38.67837551208363,
          38.7450421787503,
          38.811708845416966,
          38.878375512083636,
          38.9450421787503,
          39.01170884541697,
          39.07837551208363,
          39.1450421787503,
          39.211708845416965,
          39.278375512083635,
          39.345042178750305,
          39.41170884541697,
          39.47837551208364,
          39.5450421787503,
          39.61170884541697,
          39.67837551208363,
          39.7450421787503,
          39.811708845416966,
          39.878375512083636,
          39.9450421787503,
          40.01170884541697,
          40.07837551208363,
          40.1450421787503,
          40.211708845416965,
          40.278375512083635,
          40.345042178750305,
          40.41170884541697,
          40.47837551208364,
          40.5450421787503,
          40.61170884541697,
          40.67837551208363,
          40.7450421787503,
          40.811708845416966,
          40.878375512083636,
          40.9450421787503,
          41.01170884541697,
          41.07837551208363,
          41.1450421787503,
          41.211708845416965,
          41.278375512083635,
          41.345042178750305,
          41.41170884541697,
          41.47837551208364,
          41.5450421787503,
          41.61170884541697,
          41.67837551208363,
          41.7450421787503,
          41.811708845416966,
          41.878375512083636,
          41.9450421787503,
          42.01170884541697,
          42.07837551208364,
          42.1450421787503,
          42.211708845416965,
          42.278375512083635,
          42.345042178750305,
          42.41170884541697,
          42.47837551208364,
          42.5450421787503,
          42.61170884541697,
          42.67837551208363,
          42.7450421787503,
          42.811708845416966,
          42.878375512083636,
          42.9450421787503,
          43.01170884541697,
          43.07837551208364,
          43.1450421787503,
          43.211708845416965,
          43.278375512083635,
          43.345042178750305,
          43.41170884541697,
          43.47837551208364,
          43.5450421787503,
          43.61170884541697,
          43.67837551208363,
          43.7450421787503,
          43.811708845416966,
          43.878375512083636,
          43.9450421787503,
          44.01170884541697,
          44.07837551208364,
          44.1450421787503,
          44.211708845416965,
          44.278375512083635,
          44.345042178750305,
          44.41170884541697,
          44.47837551208364,
          44.5450421787503,
          44.61170884541697,
          44.67837551208363,
          44.7450421787503,
          44.811708845416966,
          44.878375512083636,
          44.9450421787503,
          45.01170884541697,
          45.07837551208364,
          45.1450421787503,
          45.211708845416965,
          45.278375512083635,
          45.345042178750305,
          45.41170884541697,
          45.47837551208364,
          45.5450421787503,
          45.61170884541697,
          45.67837551208363,
          45.7450421787503,
          45.811708845416966,
          45.878375512083636,
          45.9450421787503,
          46.01170884541697,
          46.07837551208364,
          46.1450421787503,
          46.211708845416965,
          46.278375512083635,
          46.345042178750305,
          46.41170884541697,
          46.47837551208364,
          46.5450421787503,
          46.61170884541697,
          46.67837551208363,
          46.7450421787503,
          46.811708845416966,
          46.878375512083636,
          46.9450421787503,
          47.01170884541697,
          47.07837551208364,
          47.1450421787503,
          47.211708845416965,
          47.278375512083635
        ]
      },
      "refs": [
        {
          "src": "data/comparisons/13/refs/00_{man_green_shirt}.jpg",
          "name": "{man_green_shirt}"
        },
        {
          "src": "data/comparisons/13/refs/01_{man_blue_hoodie}.jpg",
          "name": "{man_blue_hoodie}"
        },
        {
          "src": "data/comparisons/13/refs/02_{fish_red_1}.jpg",
          "name": "{fish_red_1}"
        },
        {
          "src": "data/comparisons/13/refs/03_{fish_red_2}.jpg",
          "name": "{fish_red_2}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/13/videos/Ours_720p.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/13/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/13/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/13/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/13/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/13/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Deep sea fishing"
    },
    {
      "seq": "14",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                4.018
              ],
              [
                4.018,
                7.518
              ],
              [
                7.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                4.018,
                4.018009999999999
              ],
              [
                7.518,
                7.518009999999999
              ]
            ]
          },
          {
            "name": "{angler_etta}",
            "description": "{angler_etta} is a Black American woman in her mid-fifties with closely cropped silver-gray natural hair, deep brown skin, warm laugh-lined eyes, and small gold hoop earrings. She wears chest-high olive-drab waders over a faded plaid flannel shirt, a tan utility vest covered in fly patches, and a beige fishing hat with a ribbon of trout flies stuck to it.",
            "time_intervals": [
              [
                0.0,
                4.018
              ],
              [
                4.018,
                7.518
              ],
              [
                7.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{fly_rod}",
            "description": "{fly_rod} is a graphite four-piece fly rod, slim and dark, line stretching out into a tight loop above the water.",
            "time_intervals": [
              [
                0.0,
                4.018
              ],
              [
                4.018,
                7.518
              ],
              [
                7.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{rainbow_trout}",
            "description": "{rainbow_trout} is a wild rainbow trout with iridescent silver-pink stripe along its flank, dappled olive back, and sparkling fins, breaking the water surface as it strikes.",
            "time_intervals": [
              [
                7.518,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_mountain_stream}",
            "description": "{scene_mountain_stream} is a rocky mountain stream at golden-hour, with crystal-clear water tumbling over moss-bearded boulders, thick stands of aspen turning yellow on the banks, drifts of cottonwood fluff in the eddies, dragonflies hovering, and a soft buttery sun low in the sky.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} is a wide static shot framing {angler_etta} mid-stream, casting upstream in a slow rhythm.",
            "time_intervals": [
              0.0,
              4.018
            ]
          },
          {
            "name": "{angler_etta}",
            "description": "{angler_etta} stands thigh-deep in the stream, wrist flicking the rod through smooth false casts.",
            "time_intervals": [
              0.0,
              4.018
            ]
          },
          {
            "name": "{fly_rod}",
            "description": "{fly_rod} flexes and unloads as {angler_etta} false-casts.",
            "time_intervals": [
              0.0,
              4.018
            ]
          },
          {
            "name": "{scene_mountain_stream}",
            "description": "{scene_mountain_stream} surrounds her with golden-hour light, yellow aspens, and drifting cottonwood fluff throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the rod loop tracking.",
            "time_intervals": [
              4.018,
              4.018009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight side close-up tracking the line of {fly_rod} as it loops back and forth.",
            "time_intervals": [
              4.018,
              7.518
            ]
          },
          {
            "name": "{angler_etta}",
            "description": "{angler_etta}'s gloved hand and rod tip are visible at the edge of the frame, line whistling across the air.",
            "time_intervals": [
              4.018,
              7.518
            ]
          },
          {
            "name": "{fly_rod}",
            "description": "{fly_rod}'s line draws a tight U through the air in the close-up.",
            "time_intervals": [
              4.018,
              7.518
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the slow-motion strike.",
            "time_intervals": [
              7.518,
              7.518009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a slow-motion top-down shot of {rainbow_trout} leaping clear of the water.",
            "time_intervals": [
              7.518,
              10.199999809265137
            ]
          },
          {
            "name": "{angler_etta}",
            "description": "{angler_etta}'s rod bends sharply as the strike hits, her face breaking into a delighted grin.",
            "time_intervals": [
              7.518,
              10.199999809265137
            ]
          },
          {
            "name": "{fly_rod}",
            "description": "{fly_rod} bends double in slow motion as {rainbow_trout} pulls.",
            "time_intervals": [
              7.518,
              10.199999809265137
            ]
          },
          {
            "name": "{rainbow_trout}",
            "description": "{rainbow_trout} explodes through the water surface in slow motion, body twisting, fins flared.",
            "time_intervals": [
              7.518,
              10.199999809265137
            ]
          }
        ],
        "summary": "Inside a rocky mountain stream at golden-hour with crystal-clear water tumbling over moss-bearded boulders, thick stands of yellow-turning aspen on the banks, drifts of cottonwood fluff in the eddies, dragonflies hovering, and a soft buttery sun low in the sky, a wide static frames a Black American woman in her mid-fifties with closely cropped silver-gray natural hair, deep brown skin, warm laugh-lined eyes, gold hoop earrings, chest-high olive-drab waders over a faded plaid flannel, a tan utility vest covered in fly patches, and a beige fishing hat ribboned with trout flies, standing thigh-deep mid-stream and wrist-flicking a slim graphite four-piece fly rod through smooth false casts. After four seconds a hard cut moves to a tight side close-up tracking the rod's line drawing a tight U through the air, then a third hard cut to a slow-motion top-down view shows a wild rainbow trout with iridescent silver-pink stripe and dappled olive back exploding clear of the water as the rod bends double and her face breaks into a delighted grin."
      },
      "refs": [
        {
          "src": "data/comparisons/14/refs/00_{angler_etta}.jpg",
          "name": "{angler_etta}"
        },
        {
          "src": "data/comparisons/14/refs/01_{fly_rod}.jpg",
          "name": "{fly_rod}"
        },
        {
          "src": "data/comparisons/14/refs/02_{rainbow_trout}.jpg",
          "name": "{rainbow_trout}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/14/videos/Ours_720p.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/14/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/14/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/14/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/14/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/14/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Mountain fly fishing"
    },
    {
      "seq": "15",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                1.512
              ],
              [
                1.512,
                4.412
              ],
              [
                4.918,
                7.812
              ],
              [
                7.812,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                1.512
              ],
              [
                4.412,
                4.918
              ],
              [
                7.812,
                7.81201
              ]
            ]
          },
          {
            "name": "{pilot_henrietta}",
            "description": "{pilot_henrietta} is a white woman in her late fifties with cropped silver-gray hair, weather-lined ruddy skin, and intense gray eyes. She wears a navy fleece-lined flight jacket with patches sewn on the sleeve, fingerless leather gloves, dark pants, and tall hiking boots.",
            "time_intervals": [
              [
                0.0,
                4.412
              ],
              [
                1.512,
                4.412
              ],
              [
                4.918,
                7.812
              ],
              [
                7.812,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{passenger_couple}",
            "description": "{passenger_couple} is a young Korean couple in their late twenties \u2014 a man with short messy black hair in a charcoal anorak and a woman with a long ponytail wearing a powder-blue puffer jacket \u2014 sharing one giddy nervous look.",
            "time_intervals": [
              [
                0.0,
                4.412
              ],
              [
                4.918,
                7.812
              ],
              [
                7.812,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{balloon_envelope}",
            "description": "{balloon_envelope} is the towering striped envelope of a hot-air balloon, panels alternating crimson, amber, and golden yellow, slowly inflating with the deep roar of a propane burner.",
            "time_intervals": [
              [
                0.0,
                4.412
              ],
              [
                4.918,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{wicker_basket}",
            "description": "{wicker_basket} is the rectangular tan wicker passenger basket of the balloon, with leather-padded edges, a pair of blackened propane tanks strapped to one corner, and a brass altimeter clipped to the rim.",
            "time_intervals": [
              [
                0.0,
                4.412
              ],
              [
                4.918,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_lavender_field}",
            "description": "{scene_lavender_field} is a wide rolling lavender field at sunrise, neat rows of fragrant purple-blue blooms stretching to a low stone farmhouse on the horizon, with thin mist hanging between the rows, dew silvering the petals, and a soft pink-and-gold sky.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} fades in slowly from black to a wide low shot of the lavender field, the half-inflated balloon at frame right.",
            "time_intervals": [
              0.0,
              1.512
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a slow fade-in from black across the lavender field.",
            "time_intervals": [
              0.0,
              1.512
            ]
          },
          {
            "name": "{pilot_henrietta}",
            "description": "{pilot_henrietta} stands at the burner controls with one gloved hand on the trigger, watching the envelope.",
            "time_intervals": [
              0.0,
              4.412
            ]
          },
          {
            "name": "{passenger_couple}",
            "description": "{passenger_couple} stands at the basket's edge, the woman gripping the rim with both hands.",
            "time_intervals": [
              0.0,
              4.412
            ]
          },
          {
            "name": "{balloon_envelope}",
            "description": "{balloon_envelope} swells and stiffens as the burner roars beneath it.",
            "time_intervals": [
              0.0,
              4.412
            ]
          },
          {
            "name": "{wicker_basket}",
            "description": "{wicker_basket} sits in the lavender, slowly tilting as the envelope draws upward.",
            "time_intervals": [
              0.0,
              4.412
            ]
          },
          {
            "name": "{scene_lavender_field}",
            "description": "{scene_lavender_field} stretches outward beneath the rising balloon, mist burning off as the sun climbs.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight low-angle close-up on the propane burner roaring up into the envelope.",
            "time_intervals": [
              1.512,
              4.412
            ]
          },
          {
            "name": "{pilot_henrietta}",
            "description": "{pilot_henrietta}'s gloved hand pulls the trigger, sending a column of orange flame upward.",
            "time_intervals": [
              1.512,
              4.412
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a half-second cross-dissolve with motion blur to the rising aerial.",
            "time_intervals": [
              4.412,
              4.918
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cross-dissolves with motion blur to a wide aerial drone shot lifting up alongside the rising balloon.",
            "time_intervals": [
              4.918,
              7.812
            ]
          },
          {
            "name": "{pilot_henrietta}",
            "description": "{pilot_henrietta} ascends within the basket, scanning the horizon with her chin lifted.",
            "time_intervals": [
              4.918,
              7.812
            ]
          },
          {
            "name": "{passenger_couple}",
            "description": "{passenger_couple} is visible in the basket below as the balloon rises, holding each other and laughing.",
            "time_intervals": [
              4.918,
              7.812
            ]
          },
          {
            "name": "{balloon_envelope}",
            "description": "{balloon_envelope} is fully inflated and lifting off, bright stripes against the pink-gold sky.",
            "time_intervals": [
              4.918,
              10.199999809265137
            ]
          },
          {
            "name": "{wicker_basket}",
            "description": "{wicker_basket} hangs below {balloon_envelope}, ascending steadily in the aerial.",
            "time_intervals": [
              4.918,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the close-up of Henrietta.",
            "time_intervals": [
              7.812,
              7.81201
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up on {pilot_henrietta}'s face as she smiles, gauges glowing.",
            "time_intervals": [
              7.812,
              10.199999809265137
            ]
          },
          {
            "name": "{pilot_henrietta}",
            "description": "{pilot_henrietta} smiles broadly, eyes crinkling, as the morning light catches her face.",
            "time_intervals": [
              7.812,
              10.199999809265137
            ]
          },
          {
            "name": "{passenger_couple}",
            "description": "{passenger_couple} is partially in frame behind {pilot_henrietta}, leaning into one another.",
            "time_intervals": [
              7.812,
              10.199999809265137
            ]
          }
        ],
        "summary": "On a wide rolling lavender field at sunrise with neat rows of fragrant purple-blue blooms stretching to a low stone farmhouse on the horizon, thin mist hanging between the rows, dew silvering the petals, and a soft pink-and-gold sky, the shot fades in slowly from black over a second and a half to a wide low view as a towering balloon envelope of alternating crimson, amber, and golden-yellow stripes inflates with the deep roar of a propane burner. A hard cut moves to a tight low-angle close-up on the burner sending a column of orange flame upward, with a weathered white pilot in her late fifties with cropped silver-gray hair, ruddy skin, intense gray eyes, a patched navy flight jacket, fingerless leather gloves, dark pants, and hiking boots gripping the trigger while a young Korean couple in their late twenties \u2014 a man in a charcoal anorak and a woman in a powder-blue puffer with a long ponytail \u2014 share a giddy nervous look at the basket's rim. A half-second motion-blurred cross-dissolve at four and a half seconds moves to a wide aerial drone shot lifting alongside the rising balloon as the couple laughs in each other's arms below, and a final hard cut shows a tight close-up on the pilot smiling broadly with eyes crinkling as morning light catches her face."
      },
      "refs": [
        {
          "src": "data/comparisons/15/refs/00_{pilot_henrietta}.jpg",
          "name": "{pilot_henrietta}"
        },
        {
          "src": "data/comparisons/15/refs/01_{passenger_couple}.jpg",
          "name": "{passenger_couple}"
        },
        {
          "src": "data/comparisons/15/refs/02_{balloon_envelope}.jpg",
          "name": "{balloon_envelope}"
        },
        {
          "src": "data/comparisons/15/refs/03_{wicker_basket}.jpg",
          "name": "{wicker_basket}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/15/videos/Ours.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/15/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/15/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/15/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/15/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/15/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Hot air balloon"
    },
    {
      "seq": "16",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                2.412
              ],
              [
                2.412,
                4.812
              ],
              [
                4.812,
                7.512
              ],
              [
                7.512,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.412,
                2.41201
              ],
              [
                4.812,
                4.81201
              ],
              [
                7.512,
                7.512009999999999
              ]
            ]
          },
          {
            "name": "{rider_kobi}",
            "description": "{rider_kobi} is an Australian man in his late twenties with sun-bleached blond hair plastered to his forehead with sweat, deep tan skin, light blue eyes hidden behind clear riding goggles, and a few days of stubble. He wears a forest-green long-sleeve riding jersey, padded black knee guards, a full-face matte black helmet pushed up, and dirt-streaked black gloves.",
            "time_intervals": [
              [
                0.0,
                2.412
              ],
              [
                2.412,
                4.812
              ],
              [
                4.812,
                7.512
              ],
              [
                7.512,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{enduro_bike}",
            "description": "{enduro_bike} is a bright-orange full-suspension enduro mountain bike with thick mud-caked tires, a long dropper post, and chipped paint along the down tube.",
            "time_intervals": [
              [
                0.0,
                2.412
              ],
              [
                2.412,
                4.812
              ],
              [
                4.812,
                7.512
              ]
            ]
          },
          {
            "name": "{scene_redwood_singletrack}",
            "description": "{scene_redwood_singletrack} is a narrow loamy singletrack cut through a coastal redwood forest, with massive ferns dripping morning dew, towering cinnamon-colored redwood trunks, soft beams of golden sunlight slanting through the canopy, and root-and-rock features along the trail.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} is a chest-mounted POV from {rider_kobi}, ferns whipping past as the bike accelerates downhill.",
            "time_intervals": [
              0.0,
              2.412
            ]
          },
          {
            "name": "{rider_kobi}",
            "description": "{rider_kobi}'s POV shows handlebars and his gloved hands flicking the bike line to line as ferns blur past.",
            "time_intervals": [
              0.0,
              2.412
            ]
          },
          {
            "name": "{enduro_bike}",
            "description": "{enduro_bike} bottoms out and rebounds smoothly under {rider_kobi} on each impact in the POV.",
            "time_intervals": [
              0.0,
              2.412
            ]
          },
          {
            "name": "{scene_redwood_singletrack}",
            "description": "{scene_redwood_singletrack} surrounds the run with redwood trunks, dewy ferns, and slanting golden sunbeams throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the slow-motion jump.",
            "time_intervals": [
              2.412,
              2.41201
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a slow-motion side-tracking shot of {enduro_bike} hitting a small jump.",
            "time_intervals": [
              2.412,
              4.812
            ]
          },
          {
            "name": "{rider_kobi}",
            "description": "{rider_kobi} hangs in the air in slow motion, body crouched low over the frame, helmet visor catching a sunbeam.",
            "time_intervals": [
              2.412,
              4.812
            ]
          },
          {
            "name": "{enduro_bike}",
            "description": "{enduro_bike} hangs in slow-motion mid-air, both wheels off the ground, suspension fully extended.",
            "time_intervals": [
              2.412,
              4.812
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the trail-level switchback drift.",
            "time_intervals": [
              4.812,
              4.81201
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a low static shot at trail level as {rider_kobi} drifts the bike around a switchback.",
            "time_intervals": [
              4.812,
              7.512
            ]
          },
          {
            "name": "{rider_kobi}",
            "description": "{rider_kobi} drifts the rear tire wide around the corner, dirt sprayed in an arc.",
            "time_intervals": [
              4.812,
              7.512
            ]
          },
          {
            "name": "{enduro_bike}",
            "description": "{enduro_bike}'s rear tire slides wide as {rider_kobi} drifts the corner.",
            "time_intervals": [
              4.812,
              7.512
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the canopy-rising drone shot.",
            "time_intervals": [
              7.512,
              7.512009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a wide overhead drone shot lifting up through the canopy as he descends.",
            "time_intervals": [
              7.512,
              10.199999809265137
            ]
          },
          {
            "name": "{rider_kobi}",
            "description": "{rider_kobi} is a small bright-green dot threading the singletrack as the camera rises through the canopy.",
            "time_intervals": [
              7.512,
              10.199999809265137
            ]
          }
        ],
        "summary": "Through a narrow loamy singletrack cut through a coastal redwood forest with massive dewy ferns, towering cinnamon-colored redwood trunks, soft beams of golden morning sunlight slanting through the canopy, and root-and-rock features along the trail, a chest-mounted POV from an Australian man in his late twenties with sun-bleached blond hair, deep tan skin, light blue eyes behind clear goggles, stubble, a forest-green long-sleeve riding jersey, padded black knee guards, a matte black full-face helmet pushed up, and dirt-streaked gloves shows handlebars flicking line to line as ferns whip past on his bright-orange full-suspension enduro mountain bike with mud-caked tires. After two and a half seconds a hard cut moves to a slow-motion side-tracking shot as he hits a small jump and hangs mid-air with body crouched low over the frame and visor catching a sunbeam, then a third hard cut shows a low static at trail level as he drifts the rear tire wide around a switchback throwing an arc of dirt, and a final hard cut at seven and a half seconds reveals a wide overhead drone shot lifting up through the canopy as he becomes a small bright-green dot threading the singletrack below."
      },
      "refs": [
        {
          "src": "data/comparisons/16/refs/00_{rider_kobi}.jpg",
          "name": "{rider_kobi}"
        },
        {
          "src": "data/comparisons/16/refs/01_{enduro_bike}.jpg",
          "name": "{enduro_bike}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/16/videos/Ours.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/16/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/16/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/16/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/16/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/16/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Forest trail riding"
    },
    {
      "seq": "17",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.918,
                3.91801
              ],
              [
                7.018,
                7.018009999999999
              ]
            ]
          },
          {
            "name": "{printer_lila}",
            "description": "{printer_lila} is a white printer in her late twenties with chin-length curly red hair tucked behind her ears, freckles, and ink-streaked hands. She wears an indigo work shirt over a striped white-and-black tee, dark jeans, a canvas work apron, and brown leather boots.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{letterpress_machine}",
            "description": "{letterpress_machine} is a large cast-iron Vandercook proof letterpress with a polished steel press bed, ink rollers, and a hand-cranked carriage.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{type_block}",
            "description": "{type_block} is a wooden block of arranged metal type spelling out 'HELLO BROOKLYN' in serif letters set in the press bed.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{ink_roller}",
            "description": "{ink_roller} is a thick rubber ink roller covered in glossy black ink, suspended above the type bed.",
            "time_intervals": [
              [
                3.918,
                7.018
              ]
            ]
          },
          {
            "name": "{printed_card}",
            "description": "{printed_card} is the freshly printed card with 'HELLO BROOKLYN' inked in deep black on cream cotton paper.",
            "time_intervals": [
              [
                7.018,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_print_shop}",
            "description": "{scene_print_shop} is a vintage Brooklyn letterpress print shop \u2014 wooden floors, multiple cast-iron presses, drawers of metal type along one wall, a rack of dried paper proofs hanging above the room, exposed brick wall with framed posters, and a soft chime of street traffic outside.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens with a wide of {printer_lila} loading paper into {letterpress_machine}.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{printer_lila}",
            "description": "{printer_lila} loads a sheet of cream paper onto the press bed.",
            "time_intervals": [
              0.0,
              3.918
            ]
          },
          {
            "name": "{letterpress_machine}",
            "description": "{letterpress_machine}'s carriage rolls forward and back smoothly.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{type_block}",
            "description": "{type_block} sits in the bed throughout, freshly inked.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{scene_print_shop}",
            "description": "{scene_print_shop} surrounds her with hanging proofs and metal type drawers throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the inking top-down.",
            "time_intervals": [
              3.918,
              3.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a top-down close-up of {ink_roller} rolling glossy black ink over {type_block}.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{printer_lila}",
            "description": "{printer_lila} cranks the carriage forward, rolling ink across {type_block}.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{ink_roller}",
            "description": "{ink_roller} rolls glossy black ink in close-up.",
            "time_intervals": [
              3.918,
              7.018
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the printed card.",
            "time_intervals": [
              7.018,
              7.018009999999999
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up of her hands lifting {printed_card} off the press.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{printer_lila}",
            "description": "{printer_lila} lifts {printed_card} off the press and grins at the clean impression.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          },
          {
            "name": "{printed_card}",
            "description": "{printed_card} bears 'HELLO BROOKLYN' in deep black on cream cotton.",
            "time_intervals": [
              7.018,
              10.199999809265137
            ]
          }
        ],
        "summary": "Inside a vintage Brooklyn letterpress print shop \u2014 wooden floors, multiple cast-iron presses, drawers of metal type along one wall, a rack of dried paper proofs hanging above the room, exposed brick wall with framed posters, and soft chime of street traffic outside \u2014 a white printer in her late twenties with chin-length curly red hair tucked behind her ears, freckles, ink-streaked hands, indigo work shirt over a striped white-and-black tee, dark jeans, canvas work apron, and brown leather boots loads a sheet of cream cotton paper onto the polished steel bed of a large cast-iron Vandercook proof letterpress with a hand-cranked carriage. A wooden block of arranged metal type spelling 'HELLO BROOKLYN' in serif letters sits in the bed; a thick rubber roller above is glossy with black ink. The camera opens on a wide. A hard cut at four seconds tightens to a top-down close-up as she cranks the carriage forward and the inked roller rolls across the type. A final hard cut at seven seconds tightens to a close-up as she lifts the freshly printed card off the press and grins at the clean impression."
      },
      "refs": [
        {
          "src": "data/comparisons/17/refs/00_printer_lila.jpg",
          "name": "{printer_lila}"
        },
        {
          "src": "data/comparisons/17/refs/01_letterpress_machine.jpg",
          "name": "{letterpress_machine}"
        },
        {
          "src": "data/comparisons/17/refs/02_type_block.jpg",
          "name": "{type_block}"
        },
        {
          "src": "data/comparisons/17/refs/03_ink_roller.jpg",
          "name": "{ink_roller}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/17/videos/CineOrchestra.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/17/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/17/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/17/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/17/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/17/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Letterpress printing"
    },
    {
      "seq": "18",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                2.918,
                2.91801
              ],
              [
                5.918,
                5.91801
              ],
              [
                8.218,
                8.21801
              ]
            ]
          },
          {
            "name": "{auctioneer_richard}",
            "description": "{auctioneer_richard} is a British man in his fifties with neatly combed silver hair, gold-rimmed glasses, a clipped white mustache, and a sharp jaw. He wears a tailored navy three-piece suit, a burgundy silk pocket square, a small magnolia boutonniere, a pearl tie pin, and a precise black tie.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{painting_on_easel}",
            "description": "{painting_on_easel} is an oil painting of a moonlit Venetian canal in deep blues and silvers, framed in ornate gold filigree, displayed on a velvet-draped wooden easel.",
            "time_intervals": [
              [
                0.0,
                5.918
              ]
            ]
          },
          {
            "name": "{paddle_bidder}",
            "description": "{paddle_bidder} is a Japanese woman in her sixties seated in the front row in a tailored ivory silk suit, pearls, and a small black hat, raising a paddle numbered '247'.",
            "time_intervals": [
              [
                2.918,
                5.918
              ]
            ]
          },
          {
            "name": "{auction_audience}",
            "description": "{auction_audience} is the rest of the audience \u2014 about sixty bidders in formal attire seated in eight tidy rows, several with raised paddles and phones to their ears.",
            "time_intervals": [
              [
                0.0,
                5.918
              ]
            ]
          },
          {
            "name": "{wooden_gavel}",
            "description": "{wooden_gavel} is a polished mahogany auctioneer's gavel resting on a circular wooden sound block on the lectern.",
            "time_intervals": [
              [
                5.918,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_auction_house}",
            "description": "{scene_auction_house} is the wood-paneled main salesroom of Christie's London \u2014 pale parquet floor, deep red velvet drapery behind the lectern, suspended brass chandeliers, frescoed ceiling, and rows of upholstered chairs.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} opens on a wide of {auctioneer_richard} at the lectern with {painting_on_easel} beside him.",
            "time_intervals": [
              0.0,
              2.918
            ]
          },
          {
            "name": "{auctioneer_richard}",
            "description": "{auctioneer_richard} stands at the lectern, calling 'twelve million, do I hear twelve and a half?'",
            "time_intervals": [
              0.0,
              2.918
            ]
          },
          {
            "name": "{painting_on_easel}",
            "description": "{painting_on_easel} stands beside the lectern under a soft spotlight throughout.",
            "time_intervals": [
              0.0,
              5.918
            ]
          },
          {
            "name": "{auction_audience}",
            "description": "{auction_audience} watches in hushed attention; a few exchange glances when the paddle goes up.",
            "time_intervals": [
              0.0,
              5.918
            ]
          },
          {
            "name": "{scene_auction_house}",
            "description": "{scene_auction_house} surrounds the salesroom with brass chandeliers and red drapery throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the bidder.",
            "time_intervals": [
              2.918,
              2.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a medium of {paddle_bidder} raising paddle 247.",
            "time_intervals": [
              2.918,
              5.918
            ]
          },
          {
            "name": "{auctioneer_richard}",
            "description": "{auctioneer_richard} watches {paddle_bidder} raise the paddle and announces 'twelve and a half, fair warning.'",
            "time_intervals": [
              2.918,
              5.918
            ]
          },
          {
            "name": "{paddle_bidder}",
            "description": "{paddle_bidder} raises paddle 247 with a small confident nod.",
            "time_intervals": [
              2.918,
              5.918
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the gavel raised.",
            "time_intervals": [
              5.918,
              5.91801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up on {auctioneer_richard}'s hand raising {wooden_gavel}.",
            "time_intervals": [
              5.918,
              8.218
            ]
          },
          {
            "name": "{auctioneer_richard}",
            "description": "{auctioneer_richard}'s hand lifts {wooden_gavel} high above the block.",
            "time_intervals": [
              5.918,
              8.218
            ]
          },
          {
            "name": "{wooden_gavel}",
            "description": "{wooden_gavel} is raised high, then strikes the sound block with a sharp crack.",
            "time_intervals": [
              5.918,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the gavel down.",
            "time_intervals": [
              8.218,
              8.21801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up on {wooden_gavel} striking the sound block.",
            "time_intervals": [
              8.218,
              10.199999809265137
            ]
          },
          {
            "name": "{auctioneer_richard}",
            "description": "{auctioneer_richard} brings {wooden_gavel} down with a resounding crack \u2014 'sold!'.",
            "time_intervals": [
              8.218,
              10.199999809265137
            ]
          }
        ],
        "summary": "Inside the wood-paneled main salesroom of Christie's London \u2014 pale parquet floor, deep red velvet drapery behind the lectern, suspended brass chandeliers, frescoed ceiling, and rows of upholstered chairs \u2014 a British auctioneer in his fifties with neatly combed silver hair, gold-rimmed glasses, clipped white mustache, sharp jaw, tailored navy three-piece suit, burgundy silk pocket square, magnolia boutonniere, pearl tie pin, and precise black tie stands at the lectern beside an ornately gold-framed oil of a moonlit Venetian canal on a velvet easel, calling 'twelve million, do I hear twelve and a half?' A hard cut at three seconds drops to a medium of a Japanese front-row bidder in her sixties \u2014 ivory silk suit, pearls, small black hat \u2014 raising paddle 247. Another hard cut at six seconds tightens to his hand lifting the polished mahogany gavel high. A final hard cut at eight seconds tightens to the gavel striking the sound block with a sharp crack \u2014 'sold!' \u2014 while about sixty formally attired bidders watch in hushed attention."
      },
      "refs": [
        {
          "src": "data/comparisons/18/refs/00_auctioneer_richard.jpg",
          "name": "{auctioneer_richard}"
        },
        {
          "src": "data/comparisons/18/refs/01_painting_on_easel.jpg",
          "name": "{painting_on_easel}"
        },
        {
          "src": "data/comparisons/18/refs/02_paddle_bidder.jpg",
          "name": "{paddle_bidder}"
        },
        {
          "src": "data/comparisons/18/refs/03_auction_audience.jpg",
          "name": "{auction_audience}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/18/videos/CineOrchestra.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/18/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/18/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/18/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/18/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/18/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Art auction"
    },
    {
      "seq": "19",
      "timeline": {
        "global_entities": [
          {
            "name": "{camera}",
            "description": "",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{transition}",
            "description": "",
            "time_intervals": [
              [
                3.412,
                3.41201
              ],
              [
                7.218,
                7.21801
              ]
            ]
          },
          {
            "name": "{beekeeper_solomon}",
            "description": "{beekeeper_solomon} is a Black man in his mid-fifties wearing a crisp white beekeeper suit zipped to the chin with a wide-brimmed mesh-veil hood, thick canvas gloves, and tucked-in trousers. The veil casts soft shadows over his face, but a calm, focused gaze can be seen.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{wooden_hive}",
            "description": "{wooden_hive} is a stack of three white wooden Langstroth hive boxes with a sloped tin lid, an entrance reducer at the bottom, and bees buzzing in and out of the slot.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{hive_frame}",
            "description": "{hive_frame} is a wooden hive frame thickly coated in honeycomb, capped white with wax in the corners, and covered with hundreds of crawling honeybees.",
            "time_intervals": [
              [
                3.412,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{smoker_can}",
            "description": "{smoker_can} is a battered metal bee smoker with a leather bellows, smoldering, fragrant white smoke curling from its conical spout.",
            "time_intervals": [
              [
                0.0,
                3.412
              ],
              [
                7.218,
                10.199999809265137
              ]
            ]
          },
          {
            "name": "{scene_apiary_meadow}",
            "description": "{scene_apiary_meadow} is a wildflower meadow with knee-high grasses, drifts of clover and yarrow, a rustic wooden fence in the background, an old leaning apple tree, blue summer sky overhead, and the soft constant hum of insects.",
            "time_intervals": [
              [
                0.0,
                10.199999809265137
              ]
            ]
          }
        ],
        "dense_entities": [
          {
            "name": "{camera}",
            "description": "{camera} is a slow static medium shot of {beekeeper_solomon} approaching the hive with {smoker_can} in hand.",
            "time_intervals": [
              0.0,
              3.412
            ]
          },
          {
            "name": "{beekeeper_solomon}",
            "description": "{beekeeper_solomon} walks calmly through the wildflowers carrying {smoker_can}, his veiled silhouette unhurried.",
            "time_intervals": [
              0.0,
              3.412
            ]
          },
          {
            "name": "{wooden_hive}",
            "description": "{wooden_hive} stands in the meadow, bees streaming in and out of the bottom entrance.",
            "time_intervals": [
              0.0,
              3.412
            ]
          },
          {
            "name": "{smoker_can}",
            "description": "{smoker_can} swings in {beekeeper_solomon}'s gloved hand, white smoke trailing.",
            "time_intervals": [
              0.0,
              3.412
            ]
          },
          {
            "name": "{scene_apiary_meadow}",
            "description": "{scene_apiary_meadow} surrounds him with a constant insect hum and breeze stirring the wildflowers throughout.",
            "time_intervals": [
              0.0,
              10.199999809265137
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the close-up of the hive frame.",
            "time_intervals": [
              3.412,
              3.41201
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a tight close-up of {hive_frame} as he lifts it free, bees crawling across.",
            "time_intervals": [
              3.412,
              7.218
            ]
          },
          {
            "name": "{beekeeper_solomon}",
            "description": "{beekeeper_solomon}'s gloved hands hold {hive_frame} aloft, gently turning it for inspection.",
            "time_intervals": [
              3.412,
              7.218
            ]
          },
          {
            "name": "{wooden_hive}",
            "description": "{wooden_hive} is partially visible behind {hive_frame}, lid leaning against its side.",
            "time_intervals": [
              3.412,
              7.218
            ]
          },
          {
            "name": "{hive_frame}",
            "description": "{hive_frame} fills the close-up frame, hundreds of bees crawling thickly across the comb.",
            "time_intervals": [
              3.412,
              7.218
            ]
          },
          {
            "name": "{transition}",
            "description": "{transition} shows a hard cut to the wide of the workbench.",
            "time_intervals": [
              7.218,
              7.21801
            ]
          },
          {
            "name": "{camera}",
            "description": "{camera} cuts to a low static wide of {beekeeper_solomon} setting the frame down on a small workbench in the meadow.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          },
          {
            "name": "{beekeeper_solomon}",
            "description": "{beekeeper_solomon} sets the frame on a small workbench, kneeling beside it to peer through the veil.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          },
          {
            "name": "{wooden_hive}",
            "description": "{wooden_hive} is in the background of the wide as {beekeeper_solomon} works over {hive_frame}.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          },
          {
            "name": "{hive_frame}",
            "description": "{hive_frame} now rests on the workbench in the wide, bees still busy on its surface.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          },
          {
            "name": "{smoker_can}",
            "description": "{smoker_can} sits on the bench beside the frame, smoke drifting upward in a lazy spiral.",
            "time_intervals": [
              7.218,
              10.199999809265137
            ]
          }
        ],
        "summary": "In a wildflower meadow with knee-high grasses, drifts of clover and yarrow, a rustic wooden fence, an old leaning apple tree, blue summer sky, and the soft constant hum of insects, a Black beekeeper in his mid-fifties in a crisp white beekeeper suit zipped to the chin with a wide-brimmed mesh-veil hood, thick canvas gloves, and tucked-in trousers walks calmly toward a stack of three white wooden Langstroth hive boxes with a sloped tin lid and an entrance reducer at the bottom, bees streaming in and out, swinging a battered metal smoker with a leather bellows trailing fragrant white smoke. The static medium holds for nearly three and a half seconds before hard-cutting to a tight close-up of his gloved hands lifting a wooden hive frame thickly coated in honeycomb capped white with wax and crawling with hundreds of bees, gently turning it for inspection. A second hard cut at seven seconds moves to a low static wide of him setting the frame down on a small workbench, kneeling beside it to peer through the veil while the smoker sits beside it drifting smoke in a lazy spiral."
      },
      "refs": [
        {
          "src": "data/comparisons/19/refs/00_beekeeper_solomon.jpg",
          "name": "{beekeeper_solomon}"
        },
        {
          "src": "data/comparisons/19/refs/01_wooden_hive.jpg",
          "name": "{wooden_hive}"
        },
        {
          "src": "data/comparisons/19/refs/02_hive_frame.jpg",
          "name": "{hive_frame}"
        },
        {
          "src": "data/comparisons/19/refs/03_smoker_can.jpg",
          "name": "{smoker_can}"
        }
      ],
      "variants": [
        {
          "label": "CineOrchestra",
          "video": "data/comparisons/19/videos/CineOrchestra.mp4",
          "highlight": true
        },
        {
          "label": "CineTrans",
          "video": "data/comparisons/19/videos/CineTrans.mp4",
          "highlight": false
        },
        {
          "label": "MultiShotMaster",
          "video": "data/comparisons/19/videos/MultiShotMaster.mp4",
          "highlight": false
        },
        {
          "label": "Phantom",
          "video": "data/comparisons/19/videos/Phantom.mp4",
          "highlight": false
        },
        {
          "label": "ShotStream",
          "video": "data/comparisons/19/videos/ShotStream.mp4",
          "highlight": false
        },
        {
          "label": "VACE",
          "video": "data/comparisons/19/videos/VACE.mp4",
          "highlight": false
        }
      ],
      "desc": "Beekeeper in meadow"
    }
  ]
};
