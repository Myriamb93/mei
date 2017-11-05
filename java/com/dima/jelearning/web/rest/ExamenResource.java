package com.dima.jelearning.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dima.jelearning.domain.Examen;
import com.dima.jelearning.service.ExamenService;
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
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Examen.
 */
@RestController
@RequestMapping("/api")
public class ExamenResource {

    private final Logger log = LoggerFactory.getLogger(ExamenResource.class);

    private static final String ENTITY_NAME = "examen";
        
    private final ExamenService examenService;

    public ExamenResource(ExamenService examenService) {
        this.examenService = examenService;
    }

    /**
     * POST  /examen : Create a new examen.
     *
     * @param examen the examen to create
     * @return the ResponseEntity with status 201 (Created) and with body the new examen, or with status 400 (Bad Request) if the examen has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/examen")
    @Timed
    public ResponseEntity<Examen> createExamen(@RequestBody Examen examen) throws URISyntaxException {
        log.debug("REST request to save Examen : {}", examen);
        if (examen.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new examen cannot already have an ID")).body(null);
        }
        Examen result = examenService.save(examen);
        return ResponseEntity.created(new URI("/api/examen/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /examen : Updates an existing examen.
     *
     * @param examen the examen to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated examen,
     * or with status 400 (Bad Request) if the examen is not valid,
     * or with status 500 (Internal Server Error) if the examen couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/examen")
    @Timed
    public ResponseEntity<Examen> updateExamen(@RequestBody Examen examen) throws URISyntaxException {
        log.debug("REST request to update Examen : {}", examen);
        if (examen.getId() == null) {
            return createExamen(examen);
        }
        Examen result = examenService.save(examen);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, examen.getId().toString()))
            .body(result);
    }

    /**
     * GET  /examen : get all the examen.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of examen in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/examen")
    @Timed
    public ResponseEntity<List<Examen>> getAllExamen(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Examen");
        Page<Examen> page = examenService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/examen");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /examen/:id : get the "id" examen.
     *
     * @param id the id of the examen to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the examen, or with status 404 (Not Found)
     */
    @GetMapping("/examen/{id}")
    @Timed
    public ResponseEntity<Examen> getExamen(@PathVariable Long id) {
        log.debug("REST request to get Examen : {}", id);
        Examen examen = examenService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(examen));
    }

    /**
     * DELETE  /examen/:id : delete the "id" examen.
     *
     * @param id the id of the examen to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/examen/{id}")
    @Timed
    public ResponseEntity<Void> deleteExamen(@PathVariable Long id) {
        log.debug("REST request to delete Examen : {}", id);
        examenService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
