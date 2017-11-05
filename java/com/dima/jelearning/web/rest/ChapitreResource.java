package com.dima.jelearning.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dima.jelearning.domain.Chapitre;
import com.dima.jelearning.security.SecurityUtils;
import com.dima.jelearning.service.ChapitreService;
import com.dima.jelearning.web.rest.util.HeaderUtil;
import com.dima.jelearning.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Chapitre.
 */
@RestController
@RequestMapping("/api")
public class ChapitreResource {

    private final Logger log = LoggerFactory.getLogger(ChapitreResource.class);

    private static final String ENTITY_NAME = "chapitre";

    private final ChapitreService chapitreService;

    public ChapitreResource(ChapitreService chapitreService) {
        this.chapitreService = chapitreService;
    }

    /**
     * POST  /chapitres : Create a new chapitre.
     *
     * @param chapitre the chapitre to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chapitre, or with status 400 (Bad Request) if the chapitre has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chapitres")
    @Timed
    public ResponseEntity<Chapitre> createChapitre(@RequestBody Chapitre chapitre) throws URISyntaxException {
        log.debug("REST request to save Chapitre : {}", chapitre);
        if (chapitre.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new chapitre cannot already have an ID")).body(null);
        }
        chapitre.setDate(ZonedDateTime.now());
        chapitre.setChapitreUser(chapitreService.getCurrentUser(SecurityUtils.getCurrentUserLogin()));
        Chapitre result = chapitreService.save(chapitre);
        return ResponseEntity.created(new URI("/api/chapitres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chapitres : Updates an existing chapitre.
     *
     * @param chapitre the chapitre to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chapitre,
     * or with status 400 (Bad Request) if the chapitre is not valid,
     * or with status 500 (Internal Server Error) if the chapitre couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chapitres")
    @Timed
    public ResponseEntity<Chapitre> updateChapitre(@RequestBody Chapitre chapitre) throws URISyntaxException {
        log.debug("REST request to update Chapitre : {}", chapitre);
        if (chapitre.getId() == null) {
            return createChapitre(chapitre);
        }
        chapitre.setDate(ZonedDateTime.now());
        chapitre.setChapitreUser(chapitreService.getCurrentUser(SecurityUtils.getCurrentUserLogin()));
        Chapitre result = chapitreService.save(chapitre);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chapitre.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chapitres : get all the chapitres.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of chapitres in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/chapitres")
    @Timed
    public ResponseEntity<List<Chapitre>> getAllChapitres(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Chapitres");
        Page<Chapitre> page = chapitreService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/chapitres");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /chapitres/:id : get the "id" chapitre.
     *
     * @param id the id of the chapitre to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chapitre, or with status 404 (Not Found)
     */
    @GetMapping("/chapitres/{id}")
    @Timed
    public ResponseEntity<Chapitre> getChapitre(@PathVariable Long id) {
        log.debug("REST request to get Chapitre : {}", id);
        Chapitre chapitre = chapitreService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(chapitre));
    }

    /**
     * DELETE  /chapitres/:id : delete the "id" chapitre.
     *
     * @param id the id of the chapitre to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chapitres/{id}")
    @Timed
    public ResponseEntity<Void> deleteChapitre(@PathVariable Long id) {
        log.debug("REST request to delete Chapitre : {}", id);
        chapitreService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
