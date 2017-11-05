package com.dima.jelearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Cours.
 */
@Entity
@Table(name = "cours")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cours implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descrip")
    private String descrip;

    @OneToMany(mappedBy = "cours")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Chapitre> coursChapitres = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescrip() {
        return descrip;
    }

    public Cours descrip(String descrip) {
        this.descrip = descrip;
        return this;
    }

    public void setDescrip(String descrip) {
        this.descrip = descrip;
    }

    public Set<Chapitre> getCoursChapitres() {
        return coursChapitres;
    }

    public Cours coursChapitres(Set<Chapitre> chapitres) {
        this.coursChapitres = chapitres;
        return this;
    }

    public Cours addCoursChapitre(Chapitre chapitre) {
        this.coursChapitres.add(chapitre);
        chapitre.setCours(this);
        return this;
    }

    public Cours removeCoursChapitre(Chapitre chapitre) {
        this.coursChapitres.remove(chapitre);
        chapitre.setCours(null);
        return this;
    }

    public void setCoursChapitres(Set<Chapitre> chapitres) {
        this.coursChapitres = chapitres;
    }

    @Lob
    @Column(name = "icone")
    private byte[] icone;

    @Column(name = "icone_content_type")
    private String iconeContentType;

    public byte[] getIcone() {
        return icone;
    }

    public Cours icone(byte[] icone) {
        this.icone = icone;
        return this;
    }

    public void setIcone(byte[] icone) {
        this.icone = icone;
    }

    public String getIconeContentType() {
        return iconeContentType;
    }

    public Cours iconeContentType(String iconeContentType) {
        this.iconeContentType = iconeContentType;
        return this;
    }

    public void setIconeContentType(String iconeContentType) {
        this.iconeContentType = iconeContentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Cours cours = (Cours) o;
        if (cours.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, cours.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Cours{" +
            "id=" + id +
            ", icone='" + icone + "'" +
            ", iconeContentType='" + iconeContentType + "'" +
            ", descrip='" + descrip + "'" +
            '}';
    }
}
