import {select, selectAll} from 'd3-selection'
import { get } from 'lodash-es';
import './scss/style.scss';
import ScrollyTeller from './ScrollyTeller/ScrollyTeller';
import intro from './Introduction/scrollyTellerConfig'


export default class App {
  constructor() {
    /** ScrollyTeller */
    const storyConfiguration = {
      /** The id of the <div> that will contain all of the page content */
      appContainerId: 'app',
      /** build an array of story sections
       * Each section object should be a valid ScrollyTeller section configuration */
      sectionList: [
        intro
      ],
      /** optional function to receive the current sectionIdentifier,
       * narrationIndex, narrationId, and narrationClass
       * when narration blocks are entered */
      onNarrationChangedFunction: ({ narrationClass }) => {
        /** remove .active from all navButtons */
        selectAll('.navButton')
          .classed('active', false);
        /** set navButtons with class narrationClass to .active */
        selectAll(`.navButton.${narrationClass}`)
          .classed('active', true);
      },
    };

    /** create the ScrollyTeller object to validate the config */
    const storyInstance = new ScrollyTeller(storyConfiguration);

    /** parse data and build all HMTL */
    storyInstance.render();

    /** build click handlers for each button to trigger ScrollyTeller.scrollTo()
     * the appropriate section/narration as defined as DOM data- attributes */
    selectAll('.navButton')
      .on('click', function () {
        const elt = select(this).node();
        storyInstance.scrollTo(
          get(elt, ['dataset', 'section']),
          get(elt, ['dataset', 'narrationtarget']),
        );
      });
  }
}
