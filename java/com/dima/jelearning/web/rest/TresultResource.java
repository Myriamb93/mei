package com.dima.jelearning.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dima.jelearning.service.TresultService;
import com.dima.jelearning.service.dto.TresultDTO;
import com.dima.jelearning.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tresult.
 */
@RestController
@RequestMapping("/api")
public class TresultResource {

    private final Logger log = LoggerFactory.getLogger(TresultResource.class);

    private static final String ENTITY_NAME = "tresult";

    private final TresultService tresultService;

    public TresultResource(TresultService tresultService) {
        this.tresultService = tresultService;
    }

    /**
     * POST  /tresults : Create a new tresult.
     *
     * @param tresultDTO the tresultDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tresultDTO, or with status 400 (Bad Request) if the tresult has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tresults")
    @Timed
    public ResponseEntity<TresultDTO> createTresult(@RequestBody TresultDTO tresultDTO) throws URISyntaxException {
        log.debug("REST request to save Tresult : {}", tresultDTO);
        if (tresultDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tresult cannot already have an ID")).body(null);
        }
        TresultDTO result = tresultService.save(tresultDTO);
        return ResponseEntity.created(new URI("/api/tresults/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tresults : Updates an existing tresult.
     *
     * @param tresultDTO the tresultDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tresultDTO,
     * or with status 400 (Bad Request) if the tresultDTO is not valid,
     * or with status 500 (Internal Server Error) if the tresultDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tresults")
    @Timed
    public ResponseEntity<TresultDTO> updateTresult(@RequestBody TresultDTO tresultDTO) throws URISyntaxException {
        log.debug("REST request to update Tresult : {}", tresultDTO);
        if (tresultDTO.getId() == null) {
            return createTresult(tresultDTO);
        }
        TresultDTO result = tresultService.save(tresultDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tresultDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tresults : get all the tresults.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tresults in body
     */
    @GetMapping("/tresults")
    @Timed
    public List<TresultDTO> getAllTresults() {
        log.debug("REST request to get all Tresults");
        return tresultService.findAll();
    }

    /**
     * GET  /tresults/:id : get the "id" tresult.
     *
     * @param id the id of the tresultDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tresultDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tresults/{id}")
    @Timed
    public ResponseEntity<TresultDTO> getTresult(@PathVariable Long id) {
        log.debug("REST request to get Tresult : {}", id);
        TresultDTO tresultDTO = tresultService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tresultDTO));
    }

    /**
     * DELETE  /tresults/:id : delete the "id" tresult.
     *
     * @param id the id of the tresultDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tresults/{id}")
    @Timed
    public ResponseEntity<Void> deleteTresult(@PathVariable Long id) {
        log.debug("REST request to delete Tresult : {}", id);
        tresultService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
