/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');

    //grab an alement and storege it during the test. Use as to place a name value, and when using it necessary to add an @
    cy.get('[data-test="filter-items"]').as('filterInput');
    cy.get('[data-test="items"]').as('allItems');
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
  });
  it('should filter items', () => {
    cy.get('@filterInput').type('iPhone');

    cy.get('@allItems').should('not.contain.text', 'Hoodie');
    cy.get('@allItems').should('contain.text', 'iPhone');
  });
  it('should move items from the one list to the other', () => {
    cy.get('@unpackedItems').find('label').first().as('itemLabel');
    cy.get('@itemLabel').invoke('text').as('itemName');

    cy.get('@itemLabel').click();

    cy.get('@itemName').then((text) => {
      cy.get('@packedItems').contains(text);
    });
  });
});
